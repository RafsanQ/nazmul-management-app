import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export const register = async (req: Request, res: Response) => {
    const { body } = req;

    try{
        const existingUser = await prisma.employee.findUnique({
            where: {
                email: body.email
            }
        })


        // Hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(body.password, salt);

        if(existingUser){
            return res.status(400).send("Email already in use");
        }

        const newEmployee = await prisma.employee.create({
            data: {
                ...body,
                password: hashedPassword
            }
        })

        return res.status(201).json(newEmployee);

    }catch(error){
        res.status(500).json(error);
        throw error;
    }

}



export const getEmployeeDetailsByEmail = async (req:Request, res: Response) => {
    const email: string = req.params.email;
    try{
        const employee = await prisma.employee.findUnique({
            where: {
                email: email
            }
        })

        if(!employee) return res.status(404).json("Employee Not Found");

        return res.status(201).json(employee);

    }catch(error){
        res.status(500).json(error);
        throw error;
    }

}



export const getEmployeeDetailsById = async (req:Request, res: Response) => {
    const id: number = Number(req.params.id);
    try{
        const employee = await prisma.employee.findUnique({
            where: {
                id: id
            }
        })

        if(!employee) return res.status(404).json("Employee Not Found");

        return res.status(201).json(employee);

    }catch(error){
        res.status(500).json(error);
        throw error;
    }

}
