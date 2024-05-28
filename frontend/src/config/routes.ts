import SplashScreen from "../../pages/SplashScreen";
import HomeScreen from "../../pages/Home";
import LoginScreen from "../../pages/Login";
import RegisterScreen from "../../pages/Register";
import { IRouteProps } from "../library/RouteProp";
import TabNavigation from "../../pages/TabScreen";
import FavoriteScreen from "../../pages/Home";
import TailorScreen from "../../pages/Tailor";

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
        name: 'Favorite',
        component: FavoriteScreen
    },
    {
        name: 'Tailor',
        component: TailorScreen
    },
];

export default routes;
