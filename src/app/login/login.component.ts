import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SessionService} from '../services';

@Component({
  selector: 'ca-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;

  constructor(
    private router: Router,
    private service: SessionService) { }

  ngOnInit() {
  }

  login() {
    this.service.get(this.username, this.password)
      .subscribe(session => session && this.router.navigate(['chat']));
  }
}
