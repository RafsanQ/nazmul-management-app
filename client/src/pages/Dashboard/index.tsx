import { useSelector } from "react-redux";

function Index() {
  const userEmail: string = useSelector((state) => state.email);
  const token: string = useSelector((state) => state.token);
  const userType: string = useSelector((state) => state.userType);


  return (
    <div>
      Dash board for { userEmail } and token { token }. The user type is { userType }.
    </div>
  )
}

export default Index;