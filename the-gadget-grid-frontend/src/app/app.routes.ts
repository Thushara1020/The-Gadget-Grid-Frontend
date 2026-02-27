import { Routes } from '@angular/router';
import { Home } from './page/home/home';
import { Logincomponent } from './component/logincomponent/logincomponent';
import { Createaccountcomponent } from './component/createaccountcomponent/createaccountcomponent';
import { Cardcomponent } from './component/cardcomponent/cardcomponent';
import { Pradctpage } from './page/pradctpage/pradctpage';
import { Ordercomponent } from './component/ordercomponent/ordercomponent';
import { Orderpage } from './page/orderpage/orderpage';

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
    },
    {
        path:'cart',
        component: Cardcomponent
    },
    {
        path:'productpage',
        component: Pradctpage
    },
    {
        path:'orders',
        component: Orderpage
    }
];
