import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { DeleteUserDialogComponent } from './components/delete-user-dialog/delete-user-dialog.component';
import { UserDetailsFormComponent } from './components/user-details-form/user-details-form.component';
import { UserContainerComponent } from './conatiners/user-container/user-container.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        UserRoutingModule,
        SharedModule
    ],
    declarations: [
        UserContainerComponent,
        UserDetailsFormComponent,
        DeleteUserDialogComponent
    ]
})
export class UserModule { }
