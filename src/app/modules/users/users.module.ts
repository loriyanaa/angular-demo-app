import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';

import { UsersListItemComponent } from './components/users-list-item/users-list-item.component';
import { UsersContainerComponent } from './containers/users-container/users-container.component';
import { UsersRoutingModule } from './users-routing.module';
import { UmsDirectivesModule } from '../shared/ums-directives.module';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatListModule,
        MatPaginatorModule,
        UsersRoutingModule,
        UmsDirectivesModule
    ],
    declarations: [
        UsersContainerComponent,
        UsersListItemComponent
    ]
})
export class UsersModule { }
