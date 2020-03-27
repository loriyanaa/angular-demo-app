import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { UserModel } from '../../../users/models/user.model';
import { UpdatedUserModel } from '../../models/updated-user.model';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'ums-user-container',
    templateUrl: './user-container.component.html',
    styleUrls: ['./user-container.component.css']
})
export class UserContainerComponent implements OnInit {
    private userId: number;

    public user: UserModel;
    public userDetailsForm: FormGroup;
    public updatedAt: Date;
    public isInEditMode = false;

    constructor(
        private userService: UserService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute
    ) {
        this.userId = this.route.snapshot.params['id'];
        this.initiateUserDetailsForm();
    }

    ngOnInit() {
        this.userService.getUser(this.userId);
        this.userService.user$.subscribe(res => {
            this.user = res;
            this.setUserDetailsValues(this.user);
        });
    }

    onEditUser(): void {
        this.isInEditMode = !this.isInEditMode;

        if (!this.isInEditMode) {
            this.saveUserInformation();
        } else {
            this.toggleFormControls();
        }
    }

    private initiateUserDetailsForm(): void {
        this.userDetailsForm = this.formBuilder.group({
            id: [{
                value: '',
                disabled: true
            }],
            firstName: [{
                value: '',
                disabled: true
            }],
            lastName: [{
                value: '',
                disabled: true
            }],
            email: [{
                value: '',
                disabled: true
            }],
            job: [{
                value: 'Angular Guru',
                disabled: true
            }]
        });
    }

    private setUserDetailsValues(user: UserModel): void {
        this.userDetailsForm.controls.id.setValue(user.id);
        this.userDetailsForm.controls.firstName.setValue(user.firstName);
        this.userDetailsForm.controls.lastName.setValue(user.lastName);
        this.userDetailsForm.controls.email.setValue(user.email);
    }

    private toggleFormControls(): void {
        for (var control in this.userDetailsForm.controls) {
            if (this.isInEditMode) {
                this.userDetailsForm.controls[control].enable();
            } else {
                this.userDetailsForm.controls[control].disable();
            }
        }
    }

    private saveUserInformation(): void {
        this.userService.updateUser(
            this.user.id, 
            this.userDetailsForm.controls.firstName.value,
            this.userDetailsForm.controls.job.value
        );

        this.userService.updatedUser$.subscribe((user: UpdatedUserModel) => {
            this.userDetailsForm.controls.firstName.setValue(user.name);
            this.userDetailsForm.controls.job.setValue(user.job);
            this.updatedAt = user.updatedAt;
            this.toggleFormControls();
        });
    }
}
