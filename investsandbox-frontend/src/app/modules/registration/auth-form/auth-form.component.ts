import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: 'auth-form.component.html',
  styleUrls: ['auth-form.component.less']
})

export class AuthFormComponent implements OnInit {
  @Input()
  edit: boolean = false;

  @Input()
  login!: string;

  form!: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl(this.login, Validators.required),
      password: new FormControl(null, Validators.required)
    });
   }
}