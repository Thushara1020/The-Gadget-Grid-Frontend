import { Routes } from '@angular/router';
import { Home } from './page/home/home';
import { Logincomponent } from './component/logincomponent/logincomponent';
import { Createaccountcomponent } from './component/createaccountcomponent/createaccountcomponent';

export const routes: Routes = [
    {
        path: '',
        component:Home
    },
    {
        path: 'login',
        component: Logincomponent
    },
    {
        path:'create-account',
        component: Createaccountcomponent
    }
];
