import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import { CHAT_ROUTE, LOGIN_ROUTE } from "./utils/utils";

interface RouteType {
    path: string; 
    element: JSX.Element; 
  }

export const publicRoutes: RouteType[] = [
    {
        path: LOGIN_ROUTE,
        element: <Login/>
    }
]

export const privateRoutes: RouteType[] = [
    {
        path: CHAT_ROUTE,
        element: <Chat/>
    },
]
