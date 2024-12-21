import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import Map from "./components/Map/Map";
import SubscriptionPage from "./components/Stripe/Subscribtion";
import { CHAT_ROUTE, LOGIN_ROUTE, MAP_ROUTE, STRIPE_ROUTE } from "./utils/utils";

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

    {
        path: MAP_ROUTE,
        element: <Map/>
    },
    {
        path: STRIPE_ROUTE,
        element: <SubscriptionPage/>
    },
]
