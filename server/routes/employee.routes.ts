import express from "express";
import { register, getEmployeeDetailsByEmail, getEmployeeDetailsById, login } from "../controllers/employee.controllers"

const router = express.Router();

router.get('/:id', getEmployeeDetailsById)

router.get("/by-email/:email", getEmployeeDetailsByEmail)

router.post('/new-employee', register);

router.post('/login', login);

export default router;