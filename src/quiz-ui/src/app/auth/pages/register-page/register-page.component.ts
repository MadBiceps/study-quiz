import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {
  public error: string | undefined;
  public success: string | undefined;
  public valid: boolean = false;
  public validError: string | undefined;
  public form = {
    username: '',
    mail: '',
    password: '',
    confirmPassword: ''
  };

  constructor(public authService: AuthService, private router: Router) {

  }

  register() {
    this.authService.register(this.form.username, this.form.mail, this.form.password).subscribe(x => {
      if (x.status === 'Success') {
        this.success = x.message;
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 3000);
      } else {
        this.error = x.message;
      }
    });
  }

  validate() {
    // TODO: add password and mail validation

    if (this.form.username !== '') {
      if (this.form.username.length > 6) {
        this.validError = 'The username should be contains minimum 6 characters';
        this.valid = false;
      }
    }

    if (this.form.mail !== '') {
      const mailExp = new RegExp(/^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/);
      if (!mailExp.test(this.form.mail)) {
        this.validError = 'Your Mail address is not valid';
        this.valid = false;
        return;
      }
    }

    if (this.form.password == this.form.confirmPassword && this.form.password !== '') {
      // Check length
      if (this.form.password.length < 6) {
        this.valid = false;
        this.validError = 'Please use a password with minimum 6 characters.';
        return;
      }

      // Check big / small character
      if (this.form.password.search(/[a-z]/) < 0 || this.form.password.search(/[A-Z]/) < 0) {
        this.valid = false;
        this.validError = 'Please use a password that contains at least one small and one capital letter.'
        return;
      }

      // Check special character
      if (this.form.password.search(/[!@#$%^&*0-9]/) < 0) {
        this.valid = false;
        this.validError = 'Please use a password with a special character or a number inside';
        return;
      }

      this.valid = true;
      this.validError = undefined;

    }
  }
}
