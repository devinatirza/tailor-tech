import LoginScreen from "../../pages/Login";
import RegisterScreen from "../../pages/Register";
import { IRouteProps } from "../library/RouteProp";
import TabNavigation from "../../pages/TabScreen";
import RequestSent from "../../pages/RequestSent";
import TailorLoginScreen from "../../pages/TailorLogin";
import RoleSelection from "../../pages/RoleScreen";
import TailorTabNavigation from "../../pages/TailorTabScreen";

const routes: IRouteProps[] = [
    
    {
        name: 'Register',
        component: RegisterScreen
    },
    {
        name: 'Role',
        component: RoleSelection
    },
    {
        name: 'Login',
        component: LoginScreen
    },
    {
        name: 'TailorLogin',
        component: TailorLoginScreen
    },
    {
        name: 'TailorTech',
        component: TabNavigation
    },
    {
        name: 'TailorTechTailor',
        component: TailorTabNavigation
    },
    {
        name: 'RequestSent',
        component: RequestSent
    }
];

export default routes;
