import { Component, ViewChild } from '@angular/core';
import { LoginPageService } from '../../login-page.service';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
	selector: 'app-login-user-card',
	templateUrl: './login-user-card.component.html',
	styleUrls: ['./login-user-card.component.scss']
})
export class LoginUserCardComponent {
	@ViewChild('userForm') userForm: LoginFormComponent;

	constructor(public loginPageService: LoginPageService) {
		console.log(this.userForm);
	}

	

}
