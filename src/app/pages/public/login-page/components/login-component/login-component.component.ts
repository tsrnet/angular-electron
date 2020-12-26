import { Component, OnInit } from '@angular/core';
import { LoginPageService } from '../../login-page.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {

  constructor(public loginPageService: LoginPageService) { }

  ngOnInit(): void {
  }

}
