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
      if(x.message === 'Success') {
        this.router.navigate(['/auth/login']);
      } else {
        this.error = x.message;
      }
    });
  }

  validate() {
    // TODO: add password and mail validation

  }
}
