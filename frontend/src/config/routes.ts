import LoginScreen from "../../pages/Login";
import RegisterScreen from "../../pages/Register";
import { IRouteProps } from "../library/RouteProp";
import TabNavigation from "../../pages/TabScreen";
import RequestSent from "../../pages/RequestSent";

const routes: IRouteProps[] = [
    
    {
        name: 'Register',
        component: RegisterScreen
    },
    {
        name: 'Login',
        component: LoginScreen
    },
    {
        name: 'TailorTech',
        component: TabNavigation
    },
    {
        name: 'RequestSent',
        component: RequestSent
    }
];

export default routes;
