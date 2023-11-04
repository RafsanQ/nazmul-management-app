import { useSelector } from "react-redux";
import type { RootState } from '../../store'


function Index() {
  const userEmail: string = useSelector((state: RootState) => state.email);
  const token: string = useSelector((state: RootState) => state.token);
  const userType: string = useSelector((state: RootState) => state.userType);


  return (
    <div>
      Dash board for { userEmail } and token { token }. The user type is { userType }.
    </div>
  )
}

export default Index;