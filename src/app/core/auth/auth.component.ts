import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

interface AuthForm {
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword?: FormControl<string>;
  rememberMe?: FormControl<boolean>;
}

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    RouterLink,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  authType = '';
  title = '';
  authForm: FormGroup<AuthForm>;

  constructor(private readonly route: ActivatedRoute) {
    this.authForm = new FormGroup<AuthForm>({
      email: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  ngOnInit(): void {
    this.authType = this.route.snapshot.url.at(-1)!.path;
    this.title = this.authType === 'login' ? 'Sign In' : 'Sign Up';
    if (this.authType === 'login') {
      this.authForm.addControl(
        'rememberMe',
        new FormControl(false, {
          nonNullable: true,
        }),
      );
    }
    if (this.authType === 'register') {
      this.authForm.addControl(
        'confirmPassword',
        new FormControl('', {
          validators: [Validators.required],
          nonNullable: true,
        }),
      );
    }
  }

  submitAuthForm() {
    console.log(this.authForm);
  }
}
