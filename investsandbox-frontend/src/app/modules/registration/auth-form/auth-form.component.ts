import {
  IBackendApi,
  IBackendApiToken,
} from './../../../../shared/interfaces/IBackendApi';
import { TuiOrientation } from '@taiga-ui/core';
import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthFormType } from 'src/shared/models/authType.model';

function passwordConfirmValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirm')?.value;
    return password !== passwordConfirm ? { confirm: false } : null;
  };
}

function modifiedValidator(oldNickname: string, oldEmail: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null =>
    oldNickname === control.get('nickname')?.value &&
    oldEmail === control.get('email')?.value
      ? { modified: false }
      : null;
}

@Component({
  selector: 'app-auth-form',
  templateUrl: 'auth-form.component.html',
  styleUrls: ['auth-form.component.less'],
})
export class AuthFormComponent implements OnInit {
  @Input()
  type: AuthFormType = 'auth';

  @Input()
  nickname!: string;

  @Input()
  email!: string;

  form!: FormGroup;

  verticalOrientation = TuiOrientation.Vertical;

  constructor(@Inject(IBackendApiToken) private backendService: IBackendApi) {}

  ngOnInit() {
    switch (this.type) {
      case 'auth':
        this.form = new FormGroup({
          email: new FormControl(null, [Validators.required, Validators.email]),
          password: new FormControl(null, Validators.required),
        });
        break;
      case 'edit':
        this.form = new FormGroup(
          {
            nickname: new FormControl(this.nickname),
            email: new FormControl(this.email, [Validators.email]),
            password: new FormControl(),
            passwordConfirm: new FormControl(),
          },
          [
            passwordConfirmValidator(),
            modifiedValidator(this.nickname, this.email),
          ]
        );
        break;
      case 'registration':
        this.form = new FormGroup(
          {
            nickname: new FormControl(this.nickname, Validators.required),
            email: new FormControl(this.email, [
              Validators.email,
              Validators.required,
            ]),
            password: new FormControl(null, Validators.required),
            passwordConfirm: new FormControl(null, Validators.required),
          },
          [passwordConfirmValidator()]
        );
        break;
    }
  }

  registration() {
    this.backendService
      .registration(
        this.form.get('nickname')?.value,
        this.form.get('email')?.value,
        this.form.get('password')?.value
      )
      .subscribe((account) => {
        console.log(account);
      }, (error) => {
        console.log(error);
      }, () => {
        console.log(1);
      });
  }
}
