import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/message.model';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  public success = false;
  public error: string | undefined;
  public form = {
    username: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {
  }

  login() {
    this.authService.login(this.form.username, this.form.password).subscribe(x => {
      if('token' in x) {
        this.success = true;
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      } else {
        x = x as Message;
        this.error = x.message;
      }
    });
  }

}
