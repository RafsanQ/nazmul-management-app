import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login"
import RegisterPage from "../pages/Register"
import DashboardPage from "../pages/Dashboard"
import CreateNewTask from "../pages/CreateNewTask";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import EditTask from "../pages/EditTask";


interface RedirectInterface{
  targetElement: JSX.Element,
  redirectElement: JSX.Element
}

const RouteAuthGuard = (props: RedirectInterface) => {
  const userEmail: string = useSelector((state: RootState) => state.email);
  const token: string = useSelector((state: RootState) => state.token);
  if(userEmail == '' || token == ''){
    return props.redirectElement;
  }
  return props.targetElement;
}

const RouteGuardForLoginPage = (props: RedirectInterface) => {
  const userEmail: string = useSelector((state: RootState) => state.email);
  const token: string = useSelector((state: RootState) => state.token);
  if(userEmail != '' && token != ''){
    return props.redirectElement;
  }
  return props.targetElement;
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteAuthGuard targetElement={<DashboardPage/>} redirectElement={<LoginPage/>} />
  },
  {
    path: "/login",
    element: <RouteGuardForLoginPage targetElement={<LoginPage/>} redirectElement={<DashboardPage/>} />
  },
  {
    path: "/register",
    element: <RouteGuardForLoginPage targetElement={<RegisterPage/>} redirectElement={<DashboardPage/>} />
  },
  {
    path: "/new-task",
    element: <RouteAuthGuard targetElement={<CreateNewTask/>} redirectElement={<LoginPage/>}/>
  },
  {
    path: "/edit-task/",
    element: <RouteAuthGuard targetElement={<EditTask/>} redirectElement={<LoginPage/>} />
  }
  
]);

export default router;