import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import Home from './pages/home.jsx'
import ProtectedRoutes from "../components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/login",
    element: <Login/>
  }
  ,
  {
    path:"/register",
    element:<Register/>
    }
  ,
  {
    path:"/home",
    element: (
      <ProtectedRoutes>
        <Home />
      </ProtectedRoutes>
    )
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

