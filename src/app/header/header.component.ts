import { Component, OnChanges, OnInit} from '@angular/core';
import { UserRegister } from '../user/userRegister';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
   constructor(public loginService: LoginService) {
  }

  logout() {
    this.loginService.logout();
  }

}
