import express from "express";
import { register, getEmployeeDetailsByEmail, getEmployeeDetailsById, login } from "../controllers/employee.controllers"
import { varifyToken } from "../middleware/auth";

const router = express.Router();

router.get('/:id', varifyToken, getEmployeeDetailsById)

router.get("/by-email/:email", varifyToken, getEmployeeDetailsByEmail)

router.post('/new-employee', register);

router.post('/login', login);

export default router;