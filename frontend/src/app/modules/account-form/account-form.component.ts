import { IBackend, IBackendToken } from 'src/shared/interfaces/IBackend';
import { IAuth, IAuthToken } from '../../../shared/interfaces/IAuth';
import { NavigationService } from '../../../shared/services/navigation.service';
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
  AccountFormType,
  AccountFormTypeEnum,
} from 'src/shared/models/accountFormType.model';
import { NotificationsService } from 'src/shared/services/notifications.service';

@Component({
  selector: 'app-account-form',
  templateUrl: 'account-form.component.html',
  styleUrls: ['account-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountFormComponent implements OnInit {
  readonly passwordMinLength = 6;
  readonly passwordMaxLength = 30;
  readonly nameMinLength = 3;
  readonly nameMaxLength = 30;
  readonly emailPattern = /^[\w-]+@[a-zA-Z\d]+\.[a-zA-Z\d]+$/;
  readonly namePattern = /^[\da-zA-Zа-яА-я ]+$/;
  readonly authFormType = AccountFormTypeEnum;

  @Input()
  type: AccountFormType = AccountFormTypeEnum.LOGIN;

  @Input()
  name!: string;

  @Input()
  email!: string;

  form!: FormGroup;

  tuiVerticalOrientation = TuiOrientation.Vertical;

  get nameInputValue() {
    return this.form.get('name')?.value;
  }

  get emailInputValue() {
    return this.form.get('email')?.value;
  }

  get passwordInputValue() {
    return this.form.get('password')?.value;
  }

  get passwordConfirmInputValue() {
    return this.form.get('passwordConfirm')?.value;
  }

  constructor(
    @Inject(IAuthToken) private authService: IAuth,
    @Inject(IBackendToken) private backendService: IBackend,
    private notifications: NotificationsService,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    switch (this.type) {
      case AccountFormTypeEnum.LOGIN:
        this.form = new FormGroup({
          email: new FormControl(null, [
            Validators.required,
            Validators.pattern(this.emailPattern),
          ]),
          password: new FormControl(null, [
            Validators.required,
            Validators.minLength(this.passwordMinLength),
            Validators.maxLength(this.passwordMaxLength),
          ]),
        });
        break;
      case AccountFormTypeEnum.EDIT_ACCOUNT:
        this.form = new FormGroup(
          {
            name: new FormControl(this.name, [
              Validators.pattern(this.namePattern),
              Validators.minLength(this.nameMinLength),
              Validators.maxLength(this.nameMaxLength),
            ]),
            email: new FormControl(this.email, [
              Validators.pattern(this.emailPattern),
            ]),
          },
          [this.modifiedValidator()]
        );
        break;
      case AccountFormTypeEnum.EDIT_PASSWORD:
        this.form = new FormGroup(
          {
            password: new FormControl(null, [
              Validators.required,
              Validators.minLength(this.passwordMinLength),
              Validators.maxLength(this.passwordMaxLength),
            ]),
            passwordConfirm: new FormControl(null, [Validators.required]),
          },
          [this.passwordConfirmValidator()]
        );
        break;
      case AccountFormTypeEnum.REGISTRATION:
        this.form = new FormGroup(
          {
            name: new FormControl(this.name, [
              Validators.required,
              Validators.pattern(this.namePattern),
              Validators.minLength(this.nameMinLength),
              Validators.maxLength(this.nameMaxLength),
            ]),
            email: new FormControl(this.email, [
              Validators.pattern(this.emailPattern),
              Validators.required,
            ]),
            password: new FormControl(null, [
              Validators.required,
              Validators.minLength(this.passwordMinLength),
              Validators.maxLength(this.passwordMaxLength),
            ]),
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
        this.deleteExtraSpaces(this.nameInputValue),
        this.deleteExtraSpaces(this.emailInputValue),
        this.deleteExtraSpaces(this.passwordInputValue)
      )
      .subscribe(
        () => {
          this.navigationService.toMain();
        },
        () => {
          this.notifications.showError(
            'Ошибка регистрации',
            'Возможно, такой пользователь уже существует'
          );
        }
      );
  }

  private login() {
    this.authService
      .login(
        this.deleteExtraSpaces(this.emailInputValue),
        this.deleteExtraSpaces(this.passwordInputValue)
      )
      .subscribe(
        () => {
          this.navigationService.toMain();
        },
        (error) => {
          if (error.status === 403) {
            this.notifications.showError(
              'Ошибка авторизации',
              'Неверная почта и/или пароль'
            );
          }
        }
      );
  }

  private editAccountInfo() {
    const nickname = this.deleteExtraSpaces(this.nameInputValue);
    const email = this.deleteExtraSpaces(this.emailInputValue);

    if (nickname || email) {
      this.backendService.editAccountInfo(
        nickname ? nickname : undefined,
        email ? email : undefined
      );
    }
  }

  private editAccountPassword() {
    const password = this.deleteExtraSpaces(this.passwordInputValue);

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
      const newName = this.deleteExtraSpaces(control.get('name')?.value);
      const newEmail = this.deleteExtraSpaces(control.get('email')?.value);

      return (this.name === newName || !newName) &&
        (this.email === newEmail || !newEmail)
        ? { modified: false }
        : null;
    };
  }

  private deleteExtraSpaces(str: string) {
    return str.replace(/\s+/g, ' ').trim();
  }

  submitForm() {
    switch (this.type) {
      case AccountFormTypeEnum.LOGIN:
        this.login();
        break;
      case AccountFormTypeEnum.REGISTRATION:
        this.registration();
        break;
      case AccountFormTypeEnum.EDIT_ACCOUNT:
        this.editAccountInfo();
        break;
      case AccountFormTypeEnum.EDIT_PASSWORD:
        this.editAccountPassword();
        break;
    }
  }

  validateNameLength(): boolean {
    return (
      this.nameInputValue &&
      this.nameInputValue.length >= this.nameMinLength &&
      this.nameInputValue.length <= this.nameMaxLength
    );
  }

  validateNamePattern(): boolean {
    return this.nameInputValue && this.namePattern.test(this.nameInputValue);
  }

  validatePasswordLength(): boolean {
    return (
      this.passwordInputValue &&
      this.passwordInputValue.length >= this.passwordMinLength &&
      this.passwordInputValue.length <= this.passwordMaxLength
    );
  }

  validateEmailPattern(): boolean {
    return this.emailInputValue && this.emailPattern.test(this.emailInputValue);
  }

  validatePasswordConfirm(): boolean {
    return (
      this.passwordConfirmInputValue &&
      this.passwordInputValue &&
      this.passwordInputValue === this.passwordConfirmInputValue
    );
  }
}
