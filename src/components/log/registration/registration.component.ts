import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  //
  regEmail: string;
  regPassword: string;
  //
  constructor(private userService: UserService) { }
  //
  ngOnInit() {
  }
  //
  send(): void {
    this.userService.addUser({email: this.regEmail, password: this.regPassword}).subscribe(res => {
      console.log(res);
    });
  }}
