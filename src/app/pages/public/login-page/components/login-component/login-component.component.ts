import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginPageService } from '../../login-page.service';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginUserCardComponent } from './login-user-card/login-user-card.component';

@Component({
	selector: 'app-login-component',
	templateUrl: './login-component.component.html',
	styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {

	@ViewChild('userSelect') userSelect: LoginUserCardComponent;
	@ViewChild('userForm') userForm: LoginFormComponent;
	@ViewChild('userCard') userCard: LoginUserCardComponent;

	constructor(public loginPageService: LoginPageService) { }

	ngOnInit(): void {
	}

}
