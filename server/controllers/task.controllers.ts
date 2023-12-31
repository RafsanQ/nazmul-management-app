import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export const getAllTasks = async (req:Request, res:Response) => {
    try{
        const tasks = await prisma.task.findMany({
            orderBy: [
                {
                    status: 'desc'
                },
                {
                    updatedAt: 'asc'
                },
                {
                    createdAt: 'asc'
                }
            ],
            include: {
                employee: true,
                officeAssistant: true
            }
        });
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
            orderBy: [
                {
                    status: 'desc'
                },
                {
                    updatedAt: 'asc'
                },
                {
                    createdAt: 'asc'
                }
            ],
            where: {
                employee: {
                    email: employeeEmail
                }
            },
            include: {
                employee: true,
                officeAssistant: true
            },
        })

        return res.status(200).json(tasks);

    }catch(error){
        res.status(500).json(error);
        throw error;
    }
}


export const updateTaskByOfficeAssitant = async (req:Request, res: Response) => {
    const taskId: number = Number(req.params.id);
    const dueAmount: number = Number(req.body.dueAmount);
    const officeAssistantId: number = Number(req.body.officeAssistantId);
    try{
        const task = await prisma.task.findUnique({
            where: {
                id: taskId
            }
        });

        if(!task){
            res.status(404).json("Error: Task does not exist");
            return;
        }

        const initialAmount = dueAmount > task.initialAmount ? dueAmount : undefined;           // if you want to know why we use undefined here, refer to https://www.prisma.io/docs/concepts/components/prisma-client/null-and-undefined

        const newTask = await prisma.task.update({
            where: {
                id: taskId
            },
            data: {
                initialAmount,
                dueAmount,
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

export const updateTaskByEmployeeOwner = async (req:Request, res: Response) => {
    const taskId: number = Number(req.params.id);
    const text: string = String(req.body.text);
    try{
        const newTask = await prisma.task.update({
            where: {
                id: taskId
            },
            data: {
                text: text,
            }
        })

        return res.status(201).json(newTask);

    }catch(error){
        res.status(500).json(error);
        throw error;
    }  
}

export const deleteTask = async (req:Request, res: Response) => {
    const taskId: number = Number(req.params.id);
    try{
        const deletedTask = await prisma.task.delete({
            where: {
                id: taskId
            },
        })

        return res.status(201).json(deletedTask);

    }catch(error){
        res.status(500).json(error);
        throw error;
    }  
}
