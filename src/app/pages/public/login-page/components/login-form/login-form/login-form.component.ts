import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginPageService } from '../../../login-page.service';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss'],
	animations: [
		trigger('fade', [
			state('out', style({
				transform: 'translateX(350px)',
				opacity: '0'
			})),
			state('in', style({
				transform: 'translateX(0px)',
				opacity: '1'
			})),
			state('void', style({
				transform: 'translateX(-350px)',
				opacity: '0'
			})),
			state('full', style({
				transform: 'translateX(0)',
				opacity: '1'
			})),
			transition('void => in', [
				animate('350ms cubic-bezier(0.4,0.0,0.2,1)'),
			]),
			transition('full => out', [
				animate('350ms cubic-bezier(0.4,0.0,0.2,1)'),
			]),
		]),
	]
})
export class LoginFormComponent {

	//data
	email = new FormControl('', [Validators.required, Validators.email]);
	password = new FormControl('', [Validators.required, Validators.pattern('^.{6,}$')]);
	
	//view
	showPassword: boolean = false;
	step: 'out'|'in'|'void'|'full' = 'full';

	get emailErrorMessage(): string {
		if (this.email.hasError('required')) {
			return 'You must enter a value';
		}
		return this.email.hasError('email') ? 'Not a valid email' : '';
	}

	get passwordErrorMessage(): string {
		if (this.password.hasError('required')) {
			return 'You must enter a value';
		}
		return this.password.hasError('pattern') ? 'Min 6 characters, numbers & letters' : '';
	}

	constructor(public loginPageService: LoginPageService) {

	}

	public togglePasswordVisibility() {
		this.showPassword = !this.showPassword;
		this.fadeOut();
	}

	public fadeOut() {
		this.step = 'out';
	}


}
