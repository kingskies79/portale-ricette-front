
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Login } from './login';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
    userRegisterLogin: Login;

constructor(private service: LoginService ) {
  this.userRegisterLogin = new Login('', '');
}

login() {
  this.service.login(this.userRegisterLogin);  }
}
