import { Routes, RouterModule }   from '@angular/router';
import { LeagueComponent } from './containers/league.component'

const routes: Routes = [
    {
        path: '',
        component: LeagueComponent
    }
];

export const routing = RouterModule.forChild(routes);
