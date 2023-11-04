import { useSelector, useDispatch } from "react-redux";
import type { RootState } from '../../store'
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth";


function Index() {
  const userEmail: string = useSelector((state: RootState) => state.email);
  const userName: string = useSelector((state: RootState) => state.name);
  const token: string = useSelector((state: RootState) => state.token);
  const userType: string = useSelector((state: RootState) => state.userType);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  if(userEmail == '' && token == ''){
    navigate('/login');
  }

  const handleLogOut = () => {
      dispatch(
        logout()
      )
  }

  return (
    
    <div>
      Dash board for {userName}, email: { userEmail } and token { token }. The user type is { userType }.
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  )
}

export default Index;