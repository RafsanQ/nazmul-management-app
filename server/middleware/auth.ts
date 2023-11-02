import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";


export const varifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let token = req.header("Authorization");

        if(!token){
            return res.status(403).send("Access Denied");
        }

        // Remove Bearer if it exists in the header
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, String(process.env.SUPER_SECRET_KEY));
        
        next();
    }catch(error){
        res.status(404).json({ error });
    }

}