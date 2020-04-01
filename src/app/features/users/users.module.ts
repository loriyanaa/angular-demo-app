import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';

import { UsersListItemComponent } from './components/users-list-item/users-list-item.component';
import { UsersContainerComponent } from './containers/users-container/users-container.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UsersSearchComponent } from './components/users-search/users-search.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatListModule,
        MatPaginatorModule,
        MatRadioModule,
        MatInputModule,
        UsersRoutingModule,
        SharedModule
    ],
    declarations: [
        UsersContainerComponent,
        UsersListItemComponent,
        UsersSearchComponent
    ]
})
export class UsersModule { }
