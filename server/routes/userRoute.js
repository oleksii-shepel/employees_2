import express from "express";
import protect from "../middleware/protect.js";
import multer  from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

import {
  getToken,
  getUsers,
  postUsers,
  getUser,
  getPositions
} from '../controllers/userController.js';

const router = express.Router();

router
  .route('/token')
  .get(getToken);

router
  .route('/users')
  .get(protect, getUsers)
  .post(protect, upload.single('file'), postUsers);

router
  .route('/users/:id')
  .get(protect, getUser);

router
  .route('/positions')
  .get(protect, getPositions);

export default router;
