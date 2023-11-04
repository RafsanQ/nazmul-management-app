import express from "express";
import { register, getEmployeeDetailsByEmail, getEmployeeDetailsById, login } from "../controllers/employee.controllers"
import { verifyToken } from "../middleware/auth";

const router = express.Router();

router.get('/:id', verifyToken, getEmployeeDetailsById)

router.get("/by-email/:email", verifyToken, getEmployeeDetailsByEmail)

router.post('/new', register);

router.post('/login', login);

export default router;