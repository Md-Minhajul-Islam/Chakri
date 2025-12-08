import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { createError } from "../middlewares/common/errorHandler.js";

export async function applyJob(req, res, next) {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      throw createError("Job id is required.", 400);
    }
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      throw createError("You have already applied for this job!", 400);
    }
    const job = await Job.findById(jobId);
    if (!job) {
      throw createError("Job not found!", 404);
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();

    res.status(201).json({
      message: "Job applied successfully.",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

export async function getAppliedJobs(req, res, next) {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      throw createError("No Applications", 404);
    }
    res.status(200).json({
      application,
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

// number of applications to show admin
export async function getApplicants(req, res, next) {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      throw createError("Job not found", 404);
    }
    res.status(200).json({
      job,
      success: true,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateStatus(req, res, next) {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      throw createError("Status is required", 400);
    }
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      throw createError("Application not found", 404);
    }
    application.status = status.toLowerCase();
    await application.save();

    res.status(200).json({
      message: "Status updated successfully.",
      success: true,
    });
  } catch (err) {
    next(err);
  }
}
