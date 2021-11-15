import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
})
export class UserRegisterComponent implements OnInit {
  registrationForm: FormGroup;
  user: User;
  userSubmitted: boolean;

  constructor(private fb: FormBuilder, private userService: UserService, private alertifyService: AlertifyService) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    // this.registrationForm = new FormGroup({
    //   userName: new FormControl(null, Validators.required),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //   confirmPassword: new FormControl(null, [Validators.required]),
    //   mobile: new FormControl(null, [Validators.required, Validators.maxLength(11)]),
    // }, this.passwordMatchingValidator);
    this.createRegistrationForm();
  }

  // tslint:disable-next-line:typedef
  createRegistrationForm() {
    this.registrationForm = this.fb.group(
      {
        userName: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(8)]],
        confirmPassword: [null, [Validators.required]],
        mobile: [null, [Validators.required, Validators.maxLength(11)]],
      },
      { validators: this.passwordMatchingValidator }
    );
  }

  passwordMatchingValidator(fg: FormGroup): Validators {
    return fg.get('password').value === fg.get('confirmPassword').value
      ? null
      : { notmatched: true };
  }

  userData(): User {
    return (this.user = {
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value,
    });
  }

  // ------------------------------------
  // Getter methods for all form controls
  // ------------------------------------
  // tslint:disable-next-line:typedef
  get userName() {
    return this.registrationForm.get('userName') as FormControl;
  }

  // tslint:disable-next-line:typedef
  get email() {
    return this.registrationForm.get('email') as FormControl;
  }
  // tslint:disable-next-line:typedef
  get password() {
    return this.registrationForm.get('password') as FormControl;
  }
  // tslint:disable-next-line:typedef
  get confirmPassword() {
    return this.registrationForm.get('confirmPassword') as FormControl;
  }
  // tslint:disable-next-line:typedef
  get mobile() {
    return this.registrationForm.get('mobile') as FormControl;
  }
  // ------------------------
  // tslint:disable-next-line:typedef
  onSubmit() {
    // console.log(this.registrationForm);
    this.userSubmitted = true;
    if (this.registrationForm.valid) {
      // this.user = this.registrationForm.value;
      // console.log(this.user);
      // this.user = Object.assign(this.user, this.registrationForm.value); dont know why this doesnot work
      // console.log(this.user);
      this.user = this.userData();
      this.userService.addUser(this.user);
      this.registrationForm.reset();
      this.userSubmitted = false;
      this.alertifyService.error('Successfully submitted.');
    }
    else{
      this.alertifyService.error('Please provide valid input !!!!');
    }
  }
}
