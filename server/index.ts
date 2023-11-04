
import express, { Request, Response , Application } from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employee.routes'
import officeAssistantRoutes from './routes/office-assistant.routes'
import taskRoutes from './routes/task.routes'


//For env File 
import dotenv from 'dotenv';
dotenv.config();



const app: Application = express();
app.use(express.json())
app.use(express.urlencoded({limit: "1024mb", extended: true}));

// Allow cross origin policy
app.use(cors());

const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.use('/api/employee', employeeRoutes);
app.use('/api/office-assistant', officeAssistantRoutes);
app.use('/api/task', taskRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});