import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserContainerComponent } from './containers/user-container/user-container.component';

const routes: Routes = [
    {
        path: 'add',
        component: UserContainerComponent,
        data: {
            isNewUser: true
        }
    },
    {
        path: ':id',
        component: UserContainerComponent,
        data: {
            isNewUser: false
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
