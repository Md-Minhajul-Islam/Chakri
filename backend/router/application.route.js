import express from "express";
import isAuthenticated from "../middlewares/common/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";


const router = express.Router();

router.post('/apply/:id', isAuthenticated, applyJob);
router.get('/', isAuthenticated, getAppliedJobs);
router.get('/:id/applicants', isAuthenticated, getApplicants);
router.put('/status/:id/update', isAuthenticated, updateStatus);

export default router;