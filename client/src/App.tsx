import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { RouterProvider } from "react-router-dom";
import './App.css'

import router from './routes'

function App() {

  return (
    <div className='background'>
      <RouterProvider router={router} />
    </div>
      
  )
}

export default App
