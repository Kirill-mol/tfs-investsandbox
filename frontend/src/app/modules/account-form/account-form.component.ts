import { IBackend, IBackendToken } from 'src/shared/interfaces/IBackend';
import { IAuth, IAuthToken } from '../../../shared/interfaces/IAuth';
import { NavigationService } from '../../../shared/services/navigation.service';
import { TuiNotificationsService, TuiOrientation } from '@taiga-ui/core';
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

@Component({
  selector: 'app-account-form',
  templateUrl: 'account-form.component.html',
  styleUrls: ['account-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountFormComponent implements OnInit {
  private _passwordMinLength = 6;
  private _passwordMaxLength = 20;
  private _nameMinLength = 3;
  private _nameMaxLength = 30;
  private _emailPattern = /^[\w-]+@[a-zA-Z\d]+\.[a-zA-Z\d]+$/;
  private _namePattern = /^[\wа-яА-я- ]+$/;

  @Input()
  type: AccountFormType = AccountFormTypeEnum.LOGIN;

  @Input()
  name!: string;

  @Input()
  email!: string;

  readonly authFormType = AccountFormTypeEnum;

  form!: FormGroup;

  verticalOrientation = TuiOrientation.Vertical;

  constructor(
    @Inject(IAuthToken) private authService: IAuth,
    @Inject(IBackendToken) private backendService: IBackend,
    @Inject(TuiNotificationsService) private notifications: TuiNotificationsService,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    switch (this.type) {
      case AccountFormTypeEnum.LOGIN:
        this.form = new FormGroup({
          email: new FormControl(null, [
            Validators.required,
            Validators.pattern(this._emailPattern),
          ]),
          password: new FormControl(null, [
            Validators.required,
            Validators.minLength(this._passwordMinLength),
            Validators.maxLength(this._passwordMaxLength),
          ]),
        });
        break;
      case AccountFormTypeEnum.EDIT_ACCOUNT:
        this.form = new FormGroup(
          {
            name: new FormControl(this.name, [
              Validators.pattern(this._namePattern),
              Validators.minLength(this._nameMinLength),
              Validators.maxLength(this._nameMaxLength),
            ]),
            email: new FormControl(this.email, [
              Validators.pattern(this._emailPattern),
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
              Validators.minLength(this._passwordMinLength),
              Validators.maxLength(this._passwordMaxLength),
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
              Validators.pattern(this._namePattern),
              Validators.minLength(this._nameMinLength),
              Validators.maxLength(this._nameMaxLength),
            ]),
            email: new FormControl(this.email, [
              Validators.pattern(this._emailPattern),
              Validators.required,
            ]),
            password: new FormControl(null, [
              Validators.required,
              Validators.minLength(this._passwordMinLength),
              Validators.maxLength(this._passwordMaxLength),
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
        this.deleteExtraSpaces(this.form.get('name')?.value),
        this.deleteExtraSpaces(this.form.get('email')?.value),
        this.deleteExtraSpaces(this.form.get('password')?.value)
      )
      .subscribe(
        () => {
          this.navigationService.toMain();
        },
        (error) => {
          console.log(error);
          this.notifications.show('Ошибка регистрации', {
            label: 'Возможно, такой пользователь уже существует.'
          }).subscribe();
        }
      );
  }

  private login() {
    this.authService
      .login(
        this.deleteExtraSpaces(this.form.get('email')?.value),
        this.deleteExtraSpaces(this.form.get('password')?.value)
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
    const nickname = this.deleteExtraSpaces(this.form.get('name')?.value);
    const email = this.deleteExtraSpaces(this.form.get('email')?.value);

    if (nickname || email) {
      this.backendService.editAccountInfo(
        nickname ? nickname : undefined,
        email ? email : undefined
      );
    }
  }

  private editAccountPassword() {
    const password = this.deleteExtraSpaces(this.form.get('password')?.value);

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
}
