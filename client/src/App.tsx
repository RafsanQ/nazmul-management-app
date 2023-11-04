
import { RouterProvider } from "react-router-dom";
import './App.css'

import router from './routes'
import Navbar from "./components/navbar";

function App() {

  return (
    <div className='background'>
      <Navbar/>
      <RouterProvider router={router} />
    </div>
      
  )
}

export default App
