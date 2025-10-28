import { createBrowserRouter } from "react-router";
import Home from "../Pages/home/Home";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/authentication/Login";
import Register from "../Pages/authentication/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
        {
            path:"/",
            element:<Home></Home>
        }
    ]
  },
  {
    path:'/',
    element:<AuthLayout></AuthLayout>,
    children:[
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      }
    ]
  }
]);