import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { RegisterService } from '../register/register.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}



  isAuthenticated() {
    if (localStorage.getItem('user') !=  null && localStorage.getItem('user') != "") {
        return true;
      }
      return false;
    }

}
