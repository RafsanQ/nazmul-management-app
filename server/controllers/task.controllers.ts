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

export const getTaskById = async (req:Request, res:Response) => {
    const id: number = Number(req.params.id);
    try{
        const tasks = await prisma.task.findUnique({
            where: {
                id: id
            }
        });
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

export const getTasksByEmployee = async (req:Request, res: Response) => {
    const employeeEmail: string = String(req.params.email);
    try{
        const tasks = await prisma.task.findMany({
            where: {
                employee: {
                    email: employeeEmail
                }
            },
        })

        return res.status(200).json(tasks);

    }catch(error){
        res.status(500).json(error);
        throw error;
    }
}


export const updateTaskOnCompletion = async (req:Request, res: Response) => {
    const taskId: number = Number(req.params.id);
    const dueAmount: number = Number(req.body.dueAmount);
    const officeAssistantId: number = Number(req.body.officeAssistantId);
    try{
        const newTask = await prisma.task.update({
            where: {
                id: taskId
            },
            data: {
                dueAmount: dueAmount,
                status: dueAmount > 0 ? "Pending Payment" : "Completed",
                officeAssistantId: officeAssistantId
            }
        })

        return res.status(201).json(newTask);

    }catch(error){
        res.status(500).json(error);
        throw error;
    }
    
}