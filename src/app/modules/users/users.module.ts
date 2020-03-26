import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule} from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';

import { UsersContainerComponent } from './containers/users-container/users-container.component';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatPaginatorModule,
    UsersRoutingModule
  ],
  declarations: [UsersContainerComponent]
})
export class UsersModule { }
