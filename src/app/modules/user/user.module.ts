import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { UserContainerComponent } from './conatiners/user-container/user-container.component';
import { UserRoutingModule } from './user-routing.module';
import { UmsDirectivesModule } from '../shared/ums-directives.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        UserRoutingModule,
        UmsDirectivesModule
    ],
    declarations: [
        UserContainerComponent
    ]
})
export class UserModule { }
