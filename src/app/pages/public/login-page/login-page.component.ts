import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ElectronService } from '../../../core/services';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

	email = new FormControl('', [Validators.required, Validators.email]);
	password = new FormControl('', [Validators.required, Validators.pattern('^.{6,}$')]);
	isPasswordVisible: boolean = false;

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

	constructor(private core: ElectronService) { }

	public togglePasswordVisibility() {
		this.isPasswordVisible = !this.isPasswordVisible;
	}

	login() {
		return;
		this.core.authService.signIn('antoniodavidorado@gmail.com', '$%p21012864D').then(
			(res: boolean) => {
				console.log(res);
			}, (err: any) => {
				console.warn(err);
			})
		//this.core.ipcRenderer.send('login-success')
	}

	logout() {
		this.core.authService.signOut().then(
			(res: boolean) => {
				console.log(res);
			}, (err: any) => {
				console.warn(err);
			})
		//this.core.ipcRenderer.send('login-success')
	}

	status() {
		this.core.authService.signedIn.subscribe((state) => {
			console.log(state);
		})
		//this.core.ipcRenderer.send('login-success')
	}

}
