import LoginScreen from "../../pages/Login";
import RegisterScreen from "../../pages/Register";
import { IRouteProps } from "../library/RouteProp";
import TabNavigation from "../../pages/TabScreen";

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

];

export default routes;
