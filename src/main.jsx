import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'

import router from "./pages/routes"
import { RouterProvider } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthContextProvider>
        <RouterProvider router={router}/>
      </AuthContextProvider>
  </React.StrictMode>,
)
