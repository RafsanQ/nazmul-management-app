import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login"
import RegisterPage from "../pages/Register"
import DashboardPage from "../pages/Dashboard"
import CreateNewTask from "../pages/CreateNewTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage/>,
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/register",
    element: <RegisterPage/>
  },
  {
    path: "/new-task",
    element: <CreateNewTask/>
  }
  
]);

export default router;