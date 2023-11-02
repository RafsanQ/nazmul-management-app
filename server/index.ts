
import express, { Request, Response , Application } from 'express';

import dotenv from 'dotenv';


//For env File 
dotenv.config();

import employeeRoutes from './routes/employee.routes'

const app: Application = express();
app.use(express.json())
app.use(express.urlencoded({limit: "1024mb", extended: true}));


const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.use('/api/employee', employeeRoutes)

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});