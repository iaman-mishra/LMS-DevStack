import express from 'express';
import { addCourse, getEducatorCourse, updateRoleToEducator } from '../controllers/educatorController.js';
import upload from '../config/multer.js';
import {protectEducator} from '../middleware/authMiddleware.js';

const educatorRouter = express.Router();

educatorRouter.get('/update-role', updateRoleToEducator);
educatorRouter.post('/add-course', upload.single('image'), protectEducator, addCourse)
educatorRouter.get('/courses', protectEducator, getEducatorCourse)
export default educatorRouter;