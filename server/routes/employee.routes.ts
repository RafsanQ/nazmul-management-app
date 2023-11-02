import express from "express";
import { register } from "../controllers/employee.controllers"

const router = express.Router();

router.get('/employee/:id', (req, res) => {
    const id:number = Number(req.params.id);
    console.log(id);
    res.json({id: id});
})

router.post('/new-employee', register);

export default router;