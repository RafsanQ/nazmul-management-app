import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()



export const register = async (req: Request, res: Response) => {
    const { body } = req;

    try{
        const existingUser = await prisma.officeAssistant.findUnique({
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

        const newEmployee = await prisma.officeAssistant.create({
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

export const login = async (req:Request, res:Response) => {
    const { body } = req;
    try{
        const officeAssistant = await prisma.officeAssistant.findUnique({
            where: {
                email: body.email
            }
        })

        if(!officeAssistant) return res.status(404).json("Employee not found");

        const isMatch = await bcrypt.compare(body.password, officeAssistant.password);

        if(!isMatch) return res.status(403).json("Incorrect password");


        // Create a web token using a super secret key from the env file
        const token = jwt.sign({ id: officeAssistant.id }, String(process.env.SUPER_SECRET_KEY));

        // Remove the password field from the employee. The front end doesn't need it
        officeAssistant.password = "***********";

        return res.status(201).json({ officeAssistant, token});

    }catch(error){
        res.status(500).json(error);
        throw error;
    }
}



export const getEmployeeDetailsByEmail = async (req:Request, res: Response) => {
    const email: string = req.params.email;
    try{
        const officeAssistant = await prisma.officeAssistant.findUnique({
            where: {
                email: email
            }
        })

        if(!officeAssistant) return res.status(404).json("Employee Not Found");

        return res.status(201).json(officeAssistant);

    }catch(error){
        res.status(500).json(error);
        throw error;
    }
}


export const getEmployeeDetailsById = async (req:Request, res: Response) => {
    const id: number = Number(req.params.id);
    try{
        const officeAssistant = await prisma.officeAssistant.findUnique({
            where: {
                id: id
            }
        })

        if(!officeAssistant) return res.status(404).json("Employee Not Found");

        return res.status(201).json(officeAssistant);

    }catch(error){
        res.status(500).json(error);
        throw error;
    }

}
