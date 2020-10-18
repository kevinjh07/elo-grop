import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import { AuthService } from '../services/auth/auth.service';
import { mustMatch } from '../shared/validators/must-match';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  signInFormGroup: FormGroup;
  signUpFormGroup: FormGroup;
  user = new User();

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createSignInFormGroup();
    this.crateSignUpFormGroup();
  }

  createSignInFormGroup() {
    this.signInFormGroup = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.maxLength(120)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    });
  }

  crateSignUpFormGroup() {
    this.signUpFormGroup = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.maxLength(120)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
    },
    {
      validators: mustMatch('password', 'confirmPassword'),
    });
  }

  onSignIn() {
    if (this.signInFormGroup.invalid) {
      return;
    }

    this.blockUI.start('Aguarde...');
    this.authService.login(this.user).subscribe(
      (result) => {
        this.blockUI.stop();
        if (result) {
          localStorage.setItem('isLoggedin', 'true');
          this.router.navigate(['/']);
        }
      },
      (err) => {
        this.blockUI.stop();
        this.toastr.error((err.error && err.error.payload.message) || 'Usuário ou senha inválidos!');
      }
    );
  }

  onSignUp() {
    if (this.signInFormGroup.invalid) {
      return;
    }
  }
}
