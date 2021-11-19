import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  errorMessage = ''; // validation error handle
  error: { name: string, message: string } = { name: '', message: '' }; // for firebase error handle

  constructor(private authservice: AuthService, private router: Router) { }
onGoogleLogin() {
    try {
      this.authservice.loginGoogle();
    } catch (error) {console.log(error); }
  }
onFacebookLogin() {
  try {
    this.authservice.loginFacebook();
  } catch (error) {console.log(error); }
}
onGithubLogin() {
  try {
    this.authservice.loginGithub();
  } catch (error) {console.log(error); }
}
onTwitterLogin() {
  try {
    this.authservice.loginTwitter();
  } catch (error) {console.log(error); }
}
  ngOnInit(): void {
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }

  login() {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {
      this.authservice.loginWithEmail(this.email, this.password)
        .then(() => {
        this.router.navigate(['/userinfo']);
        // tslint:disable-next-line: variable-name
        }).catch((_error: { name: string; message: string; }) => {
          this.error = _error;
          this.router.navigate(['/login']);
        });
    }
  }

  validateForm(email: string, password: string) {
    if (email.length === 0) {
      this.errorMessage = 'Ingrese el email';
      return false;
    }

    if (password.length === 0) {
      this.errorMessage = 'Ingrese una contraseña';
      return false;
    }

    if (password.length < 6) {
      this.errorMessage = 'La contraseña debe ser de minimo 6 caracteres';
      return false;
    }

    this.errorMessage = '';
    return true;

  }

}

