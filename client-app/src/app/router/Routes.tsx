import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import VijestDashboard from "../../features/vijesti/dashboard/VijestDashboard";
import VijestForm from "../../features/vijesti/form/VijestForm";
import VijestDetails from "../../features/vijesti/details/VijestDetails";
import AkassaDashboard from "../../features/akassa/dashboard/AkassaDashboard";
import RadnaPravaDashboard from "../../features/radna_prava/dashboard/RadnaPravaDashboard";
import LoginForm from "../../features/users/LoginForm";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {index: true, element: <HomePage /> },
            {path: 'vijesti', element: <VijestDashboard />},
            {path: 'vijesti/:slug', element: <VijestDetails />},
            {path: 'kreiraj-vijest', element: <VijestForm key='kreiraj-vijest' />},
            {path: 'azuriraj-vijest/:slug', element: <VijestForm key='azuriraj-vijest' />},
            {path: 'prijava', element: <LoginForm />},
            {path: 'a-kassa', element: <AkassaDashboard />},
            {path: 'radna-prava', element: <RadnaPravaDashboard />},
        ]
    }
]

export const router = createBrowserRouter(routes);