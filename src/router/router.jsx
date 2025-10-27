import { createBrowserRouter } from "react-router";
import Home from "../Pages/home/Home";
import RootLayout from "../layouts/RootLayout";

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
]);