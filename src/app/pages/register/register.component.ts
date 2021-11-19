import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email = '';
  password = '';
  message = '';
  errorMessage = ''; // Error de validacion
  error: { name: string, message: string } = { name: '', message: '' };

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = {name : '' , message: ''};
  }

  register() {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {
      this.authservice.registerWithEmail(this.email, this.password)
        .then(() => {
          this.message = 'Tu informacion esta registrada en Firebase';
          // this.router.navigate(['/userinfo'])
        // tslint:disable-next-line: variable-name
        }).catch((_error: { name: string; message: string; }) => {
          this.error = _error;
          this.router.navigate(['/register']);
        });
    }
  }

  validateForm(email: string, password: string) {
    if (email.length === 0) {
      this.errorMessage = 'Por favor introduzca correo electronico';
      return false;
    }

    if (password.length === 0) {
      this.errorMessage = 'Por favor ingrese contraseña';
      return false;
    }

    if (password.length < 6) {
      this.errorMessage = 'La contraseña debe ser de al menos 6 digitos';
      return false;
    }

    this.errorMessage = '';
    return true;

  }

}

