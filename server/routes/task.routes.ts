import express from "express";
import { createNewTask, getAllTasks } from "../controllers/task.controllers";
import { verifyToken } from "../middleware/auth";


const router = express.Router();

router.get('/tasks', verifyToken, getAllTasks);
router.post('/new', verifyToken, createNewTask)

export default router;