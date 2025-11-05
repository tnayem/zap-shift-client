import { createBrowserRouter } from "react-router";
import Home from "../Pages/home/Home";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../Pages/authentication/Login";
import Register from "../Pages/authentication/Register";
import Coverage from "../Pages/Coverage/Coverage";
import SendParcel from "../Pages/parcel/SendParcel";
import PrivateRouts from "../routs/PrivateRouts";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../Pages/dashboard/MyParcels";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
          path:"/coverage",
          element:<Coverage></Coverage>
        },
        {
          path:'/sendParcel',
          element:<PrivateRouts><SendParcel></SendParcel></PrivateRouts>
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
  },
  {
    path:'/dashboard',
    element:<PrivateRouts><DashboardLayout></DashboardLayout></PrivateRouts>,
    children:[
      {
        path:'/dashboard/myParcels',
        element:<MyParcels></MyParcels>
      }
    ]
  }
]);