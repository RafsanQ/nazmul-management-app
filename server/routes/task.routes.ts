import express from "express";
import { createNewTask, getAllTasks, getTaskById, getTasksByEmployee, updateTaskOnCompletion } from "../controllers/task.controllers";
import { verifyToken } from "../middleware/auth";


const router = express.Router();

router.get('/', verifyToken, getAllTasks);
router.get('/employee/:email', verifyToken, getTasksByEmployee);
router.get('/:id', verifyToken, getTaskById);
router.post('/new', verifyToken, createNewTask);

router.put('/:id', verifyToken, updateTaskOnCompletion)


export default router;