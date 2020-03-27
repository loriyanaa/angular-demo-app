import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserContainerComponent } from './conatiners/user-container/user-container.component';

const routes: Routes = [
    { path: ':id', component: UserContainerComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
