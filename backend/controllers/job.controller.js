import { createError } from "../middlewares/common/errorHandler.js";
import { Job } from "../models/job.model.js";

// post job: admin
export async function postJob(req, res, next) {
  try {
    let {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      throw createError("Something is missing.", 400);
    }

    requirements = requirements.split(/[\s,]+/);
    const job = await Job.create({
      title,
      description,
      requirements: requirements,
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

// get job : student
export async function getAllJobs(req, res, next) {
  try {
    const keyword = req.query.keyword?.toLowerCase();

    let query = {};

    if (keyword) {
      query = {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { location: { $regex: keyword, $options: "i" } },
        ],
      };
    }
    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    if (!jobs) {
      throw createError("Jobs not found.", 404);
    }
    res.status(200).json({
      jobs,
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

// getJobById: student
export async function getJobById(req, res, next) {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      throw createError("Jobs not found.", 404);
    }
    res.status(200).json({ job, success: true });
  } catch (err) {
    next(err);
  }
}

// Jobs created by Admin
export async function getAdminJobs(req, res, next) {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId })
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      throw createError("Jobs not found.", 404);
    }
    res.status(200).json({
      jobs,
      success: true,
    });
  } catch (err) {
    next(err);
  }
}
