import express from "express";
import { register, getEmployeeDetailsByEmail, getEmployeeDetailsById, login } from "../controllers/office-assistant.controllers"
import { varifyToken } from "../middleware/auth";

const router = express.Router();

router.get('/:id', varifyToken, getEmployeeDetailsById)

router.get("/by-email/:email", varifyToken, getEmployeeDetailsByEmail)

router.post('/new', register);

router.post('/login', login);

export default router;