import { IBackend, IBackendToken } from 'src/shared/interfaces/IBackend';
import { IAuth, IAuthToken } from './../../../../shared/interfaces/IAuth';
import { NavigationService } from './../../../../shared/services/navigation.service';
import { TuiOrientation } from '@taiga-ui/core';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  AuthFormType,
  AuthFormTypeEnum,
} from 'src/shared/models/authFormType.model';

@Component({
  selector: 'app-auth-form',
  templateUrl: 'auth-form.component.html',
  styleUrls: ['auth-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent implements OnInit {
  @Input()
  type: AuthFormType = 'login';

  @Input()
  name!: string;

  @Input()
  email!: string;

  readonly authFormType = AuthFormTypeEnum;

  form!: FormGroup;

  verticalOrientation = TuiOrientation.Vertical;

  constructor(
    @Inject(IAuthToken) private authService: IAuth,
    @Inject(IBackendToken) private backendService: IBackend,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    switch (this.type) {
      case AuthFormTypeEnum.LOGIN:
        this.form = new FormGroup({
          email: new FormControl(null, [Validators.required, Validators.email]),
          password: new FormControl(null, Validators.required),
        });
        break;
      case AuthFormTypeEnum.EDIT_ACCOUNT:
        this.form = new FormGroup(
          {
            nickname: new FormControl(this.name),
            email: new FormControl(this.email, [Validators.email]),
          },
          [this.modifiedValidator()]
        );
        break;
      case AuthFormTypeEnum.EDIT_PASSWORD:
        this.form = new FormGroup(
          {
            password: new FormControl(null, Validators.required),
            passwordConfirm: new FormControl(null, Validators.required),
          },
          [this.passwordConfirmValidator()]
        );
        break;
      case AuthFormTypeEnum.REGISTRATION:
        this.form = new FormGroup(
          {
            nickname: new FormControl(this.name, Validators.required),
            email: new FormControl(this.email, [
              Validators.email,
              Validators.required,
            ]),
            password: new FormControl(null, Validators.required),
            passwordConfirm: new FormControl(null, Validators.required),
          },
          [this.passwordConfirmValidator()]
        );
        break;
    }
  }

  private registration() {
    this.authService
      .registration(
        this.deleteSpaces(this.form.get('nickname')?.value),
        this.deleteSpaces(this.form.get('email')?.value),
        this.deleteSpaces(this.form.get('password')?.value)
      )
      .subscribe(
        () => {
          this.navigationService.toMain();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  private login() {
    this.authService
      .login(
        this.deleteSpaces(this.form.get('email')?.value),
        this.deleteSpaces(this.form.get('password')?.value)
      )
      .subscribe(
        () => {
          this.navigationService.toMain();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  private editAccountInfo() {
    const nickname = this.deleteSpaces(this.form.get('nickname')?.value);
    const email = this.deleteSpaces(this.form.get('email')?.value);

    if (nickname || email) {
      this.backendService.editAccountInfo(
        nickname ? nickname : undefined,
        email ? email : undefined
      );
    }
  }

  private editAccountPassword() {
    const password = this.deleteSpaces(this.form.get('password')?.value);

    if (password) {
      this.backendService.editAccountPassword(password);
    }
  }

  private passwordConfirmValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const passwordConfirm = control.get('passwordConfirm')?.value;

      return password !== passwordConfirm ? { confirm: false } : null;
    };
  }

  private modifiedValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.name && !this.email) {
        return { empty: true };
      }
      return this.name ===
        this.deleteSpaces(control.get('nickname')?.value) &&
        this.email === this.deleteSpaces(control.get('email')?.value)
        ? { modified: false }
        : null;
    };
  }

  private deleteSpaces(str: string) {
    return str.replace(/\s+/g, ' ').trim();
  }

  submitForm() {
    switch (this.type) {
      case AuthFormTypeEnum.LOGIN:
        this.login();
        break;
      case AuthFormTypeEnum.REGISTRATION:
        this.registration();
        break;
      case AuthFormTypeEnum.EDIT_ACCOUNT:
        this.editAccountInfo();
        break;
      case AuthFormTypeEnum.EDIT_PASSWORD:
        this.editAccountPassword();
        break;
    }
  }
}
