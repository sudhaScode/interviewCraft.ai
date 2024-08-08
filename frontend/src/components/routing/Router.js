import {createBrowserRouter} from "react-router-dom";
import RouteLayout from "./RouteLayout";
import { Navigate } from "react-router-dom";
import Main from "../../Main";
import LoginPage from "../authcomponents/LoginPage";
import SignupPage from "../authcomponents/SignupPage";

/**
     Responsible for Routing in throught out application
     - Define the router with create browser router, which accpets array with a indivisual route object with routes has properties of path, element, children
     - configure with required component for each route
     - use the route in other compomnents where need to navigate
 */

const Router = createBrowserRouter([
    {
        path:"/",
        element: <Navigate to="/prompt"/>
    },
    {
        path:"/login",
        element: <LoginPage/>
    },
    {
        path:"/signup",
        element: <SignupPage/>
    },
    {
        path:"/prompt",
        element: <RouteLayout/>,
        children:[
            {
                index:true,
                element:<Main/>
            }
        ]
    },
])

export default Router;
