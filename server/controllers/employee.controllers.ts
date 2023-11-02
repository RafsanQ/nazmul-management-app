import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export const register =  async (req: Request, res: Response) => {
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
        console.error(error);
        throw error;
    }

}
