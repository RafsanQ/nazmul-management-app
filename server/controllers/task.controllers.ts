import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export const getAllTasks = async (req:Request, res:Response) => {
    try{
        const tasks = await prisma.task.findMany();
        return res.status(200).json(tasks);
    }catch(error){
        res.status(500).json(error);
        throw error;
    }
}

export const createNewTask = async (req:Request, res:Response) => {
    const { body } = req;
    try{
        const newTask = await prisma.task.create({
            data: body
        })

        return res.status(201).json(newTask);

    }catch(error){
        res.status(500).json(error);
        throw error;
    }
}
