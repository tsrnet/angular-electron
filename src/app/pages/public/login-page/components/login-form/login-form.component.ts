import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../../../../interfaces';
import { LoginPageService } from '../../login-page.service';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

	//data
	email = new FormControl('', [Validators.required, Validators.email]);
	password = new FormControl('', [Validators.required, Validators.pattern('^.{6,}$')]);
	selectedUser: User ;
	
	//view
	showPassword: boolean = false;
	showErrors: boolean = false;

	get emailErrorMessage(): string {
		if ((!this.email.untouched || this.showErrors) && this.email.hasError('required')) return 'You must enter a value';
		return this.email.hasError('email') ? 'Not a valid email' : '';
	}

	get passwordErrorMessage(): string {
		if ((!this.password.untouched || this.showErrors) && this.password.hasError('required')) return 'You must enter a value';
		return this.password.hasError('pattern') ? 'Min 6 characters, numbers & letters' : '';
	}

	constructor(public loginPageService: LoginPageService) {
		this.selectedUser = User.NewEmpty();
	}

	public checkValidity() {
		if (this.email.valid && this.password.valid) {
			this.loginPageService.newUser = this.selectedUser;
		} else {
			this.loginPageService.newUser = null;
		}
	}

	public togglePasswordVisibility() {
		this.showPassword = !this.showPassword;
	}

}
