import express from "express";
import { createTask, getTask } from "../controllers/task.controller.js";

const router = express.Router();

router.post('/create', createTask);
router.get('/tasks', getTask);

export default router
