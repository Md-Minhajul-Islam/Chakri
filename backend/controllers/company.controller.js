import { createError } from "../middlewares/common/errorHandler.js";
import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export async function registerCompany(req, res, next) {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      throw createError("Company name is required.", 400);
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      throw createError("You can't register same company.", 400);
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    res.status(201).json({
      message: "Company registered successfully.",
      company,
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

export async function getCompany(req, res, next) {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      throw createError("Companies not found", 404);
    }
    res.status(200).json({
      companies,
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

// get company by id
export async function getCompanyById(req, res, next) {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      throw createError("Company not found", 404);
    }
    res.status(200).json({
      company,
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateCompany(req, res, next) {
  try {
    const companyId = req.params.id;
    const { name, description, website, location } = req.body;

    let company = await Company.findById(companyId);

    if (!company) {
      throw createError("Company not found", 404);
    }

    if (req.file) {
      const file = req.file;

      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        folder: "Chakri",
      });
      if (company.logoPublicId) {
        await cloudinary.uploader.destroy(company.logoPublicId);
      }
      company.logoPublicId = cloudResponse.public_id;
      company.logo = cloudResponse.secure_url;
    }
    if (name) company.name = name;
    if (description) company.description = description;
    if (website) company.website = website;
    if (location) company.location = location;

    await company.save();

    res.status(200).json({
      message: "Company information updated.",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}
