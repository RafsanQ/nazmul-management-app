import express from "express";
import { createNewTask, deleteTask, getAllTasks, getTaskById, getTasksByEmployee, updateTaskByEmployeeOwner, updateTaskByOfficeAssitant} from "../controllers/task.controllers";
import { verifyToken } from "../middleware/auth";


const router = express.Router();

router.get('/', verifyToken, getAllTasks);
router.get('/employee/:email', verifyToken, getTasksByEmployee);
router.get('/:id', verifyToken, getTaskById);
router.post('/new', verifyToken, createNewTask);

router.put('/:id', verifyToken, updateTaskByOfficeAssitant);
router.put('/edit/:id', verifyToken, updateTaskByEmployeeOwner);

router.delete('/:id', verifyToken, deleteTask)
export default router;