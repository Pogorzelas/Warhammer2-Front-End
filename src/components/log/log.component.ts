import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  email: string;
  password: string;
  correctUser = false;
  wrongUser = false;
  reg = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserRespond().subscribe( respond => {
      respond === true ? this.correctUser = true : this.wrongUser = true;
    });
  }
  submit(): void {
    this.userService.logIn(this.email, this.password);
  }
  register(): void {
    this.reg = true;
  }

}



