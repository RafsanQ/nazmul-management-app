
import { RouterProvider } from "react-router-dom";
import './App.css'

import router from "./routes"
import Navbar from "./components/Navbar";


function App() {

  return (
    <div className='background'>
      <Navbar/>
      <RouterProvider router={router} />
    </div>
      
  )
}

export default App
