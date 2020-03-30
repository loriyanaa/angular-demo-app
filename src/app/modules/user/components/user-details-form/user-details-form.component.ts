import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges
    } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserModel } from '../../../users/models/user.model';
import { UpdatedUserModel } from '../../models/updated-user.model';

@Component({
    selector: 'ums-user-details-form',
    templateUrl: './user-details-form.component.html',
    styleUrls: ['./user-details-form.component.css']
})
export class UserDetailsFormComponent implements OnChanges {
    @Input() user: UserModel;
    @Input() updatedUser: UpdatedUserModel;
    @Output() saveUser = new EventEmitter<UpdatedUserModel>();

    public userDetailsForm: FormGroup;
    public updatedAt: Date;
    public isInEditMode = false;
    
    constructor(private formBuilder: FormBuilder) {
        this.initiateUserDetailsForm();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.user && changes.user.currentValue) {
            this.setUserDetailsValues();
        }

        if (changes.updatedUser && changes.updatedUser.currentValue) {
            this.setUpdatedUserDetailsValues();
        }
    }

    public onEditUser(): void {
        this.isInEditMode = !this.isInEditMode;

        if (!this.isInEditMode) {
            this.onSaveUser();
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

    private setUserDetailsValues(): void {
        this.userDetailsForm.controls.id.setValue(this.user.id);
        this.userDetailsForm.controls.firstName.setValue(this.user.firstName);
        this.userDetailsForm.controls.lastName.setValue(this.user.lastName);
        this.userDetailsForm.controls.email.setValue(this.user.email);
    }

    private setUpdatedUserDetailsValues(): void {
        this.userDetailsForm.controls.firstName.setValue(this.updatedUser.name);
        this.userDetailsForm.controls.job.setValue(this.updatedUser.job);
        this.updatedAt = this.updatedUser.updatedAt;
        this.toggleFormControls();
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

    private onSaveUser(): void {
        const updatedUserModel: UpdatedUserModel = {
            id: this.user.id, 
            name: this.userDetailsForm.controls.firstName.value,
            job: this.userDetailsForm.controls.job.value
        };

        this.saveUser.emit(updatedUserModel);
    }
}
