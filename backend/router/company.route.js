import express from "express";
import isAuthenticated from "../middlewares/common/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/multer.js";



const router = express.Router();

router.post('/register', isAuthenticated, registerCompany);
router.get('/', isAuthenticated, getCompany);
router.get('/:id', isAuthenticated, getCompanyById);
router.put('/update/:id', isAuthenticated, singleUpload, updateCompany);

export default router;