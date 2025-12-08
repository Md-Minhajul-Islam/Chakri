import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createError } from "../middlewares/common/errorHandler.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export async function register(req, res, next) {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      throw createError("Something is missing.", 400);
    }

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      folder: "Chakri",
      resource_type: "auto",
    });

    const user = await User.findOne({ email });
    if (user) {
      throw createError("User already exist with this email.", 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      throw createError("Something is missing.", 400);
    }
    let user = await User.findOne({ email });
    if (!user) {
      throw createError("Incorrect email or password.", 400);
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw createError("Incorrect email or password.", 400);
    }
    // check role
    if (role !== user.role) {
      throw createError("Account doesn't exist with current role.", 400);
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // must be true on HTTPS
        sameSite: "none", // allow cross-origin
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res, next) {
  try {
    res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    let skillsArray = [];
    if (skills) {
      skillsArray = skills.split(/[\s,]+/);
    }
    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      throw createError("User not found.", 404);
    }
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    if (req.file) {
      const file = req.file;

      if (user.profile.resumePublicId) {
        await cloudinary.uploader.destroy(user.profile.resumePublicId);
      }

      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        folder: "Chakri",
        resource_type: "auto",
      });
      user.profile.resumePublicId = cloudResponse.public_id;
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }
    await user.save();
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (err) {
    next(err);
  }
}
