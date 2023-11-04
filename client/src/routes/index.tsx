import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login"
import RegisterPage from "../pages/Register"
import DashboardPage from "../pages/Dashboard"

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
  
]);

export default router;