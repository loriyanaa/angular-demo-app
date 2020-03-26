import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'ums-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {
  @Input() error: string;

  @Output() submitForm = new EventEmitter<any>();

  public authForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.authForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  public onSubmit(): void {
    if (this.authForm.invalid) {
      return;
    }

    const formData = { ...this.authForm.value };
    this.submitForm.emit(formData);
  }
}
