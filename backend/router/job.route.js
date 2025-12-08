import express from 'express';
import isAuthenticated from '../middlewares/common/isAuthenticated.js';
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.post('/', isAuthenticated, postJob);
router.get('/', isAuthenticated, getAllJobs);
router.get('/getadminjobs', isAuthenticated, getAdminJobs);
router.get('/:id', isAuthenticated, getJobById);

export default router;