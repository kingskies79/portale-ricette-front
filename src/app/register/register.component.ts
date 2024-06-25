import { Component, OnInit } from '@angular/core';
import { UserRegister } from '../user/userRegister';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit  {
  user: UserRegister;

  constructor(private registerService: RegisterService ) {
    this.user = new UserRegister("", "", "", "") ;
  }

  register() {
    this.registerService.register(this.user);
  }

  ngOnInit() {

  }

}
