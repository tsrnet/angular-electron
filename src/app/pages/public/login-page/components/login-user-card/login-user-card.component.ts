import { Component } from '@angular/core';
import { LoginPageService } from '../../login-page.service';


@Component({
	selector: 'app-login-user-card',
	templateUrl: './login-user-card.component.html',
	styleUrls: ['./login-user-card.component.scss']
})
export class LoginUserCardComponent {

	constructor(public loginPageService: LoginPageService) {}

}
