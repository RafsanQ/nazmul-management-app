import { createBrowserRouter, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from '../store'


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