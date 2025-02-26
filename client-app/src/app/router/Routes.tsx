import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import VijestDashboard from "../../features/vijesti/dashboard/VijestDashboard";
import VijestForm from "../../features/vijesti/form/VijestForm";
import VijestDetails from "../../features/vijesti/details/VijestDetails";

export const routes: RouteObject[] = [
    { path: '/', element: <HomePage /> },
    {
        path: '/',
        element: <App />,
        children: [
            {path: 'vijesti', element: <VijestDashboard />},
            {path: 'vijesti/:slug', element: <VijestDetails />},
            {path: 'kreiraj-vijest', element: <VijestForm key='kreiraj-vijest' />},
            {path: 'azuriraj-vijest/:slug', element: <VijestForm key='azuriraj-vijest' />},
        ]
    }
]

export const router = createBrowserRouter(routes);