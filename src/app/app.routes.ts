import {Routes} from '@angular/router';
import {authGuard} from './auth.guard';
import {LoginComponent} from './login/login.component';
import {EngineComponent} from './engine/engine.component';

export const routes:Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: EngineComponent,
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];