import express from "express";
import { register, getEmployeeDetailsByEmail, getEmployeeDetailsById } from "../controllers/employee.controllers"

const router = express.Router();

router.get('/employee/:id', getEmployeeDetailsById)

router.get("/employee-details/:email", getEmployeeDetailsByEmail)

router.post('/new-employee', register);

export default router;