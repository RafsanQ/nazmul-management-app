import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login"
import RegisterPage from "../pages/Register"
import DashboardPage from "../pages/Dashboard"
import CreateNewTask from "../pages/CreateNewTask";
import { useSelector } from "react-redux";
import type { RootState } from "../store";


interface RedirectInterface{
  targetLink: JSX.Element,
  redirectLink: JSX.Element
}

const RouteAuthGuard = (props: RedirectInterface) => {
  const userEmail: string = useSelector((state: RootState) => state.email);
  const token: string = useSelector((state: RootState) => state.token);
  if(userEmail == '' || token == ''){
    return props.redirectLink;
  }
  return props.targetLink;
}

const RouteGuardForLoginPage = (props: RedirectInterface) => {
  const userEmail: string = useSelector((state: RootState) => state.email);
  const token: string = useSelector((state: RootState) => state.token);
  if(userEmail != '' && token != ''){
    return props.redirectLink;
  }
  return props.targetLink;
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteAuthGuard targetLink={<DashboardPage/>} redirectLink={<LoginPage/>}/>
  },
  {
    path: "/login",
    element: <RouteGuardForLoginPage targetLink={<LoginPage/>} redirectLink={<DashboardPage/>} />
  },
  {
    path: "/register",
    element: <RouteGuardForLoginPage targetLink={<RegisterPage/>} redirectLink={<DashboardPage/>} />
  },
  {
    path: "/new-task",
    element: <RouteAuthGuard targetLink={<CreateNewTask/>} redirectLink={<LoginPage/>}/>
  }
  
]);

export default router;