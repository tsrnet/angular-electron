import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ElectronService } from '../../../services';
import { User } from '../../../interfaces/index';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

	email = new FormControl('', [Validators.required, Validators.email]);
	password = new FormControl('', [Validators.required, Validators.pattern('^.{6,}$')]);
	isPasswordVisible: boolean = false;
	showSpinner: boolean = false;

	private get user(): User {
		return {
			email: this.email.value,
			password: this.password.value
		}
	}

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

	logIn() {
		this.showSpinner = true;
		this.core.authService.signIn(this.user.email, this.user.password).then(
			(res: boolean) => {
				this.showSpinner = false;
				if (res) this.core.ipcRenderer.send('login-success');
				else console.log(res);
			}, (err: any) => {
				this.showSpinner = false;
				console.warn(err);
			}
		)
	}

	// logout() {
	// 	this.core.authService.signOut().then(
	// 		(res: boolean) => {
	// 			console.log(res);
	// 		}, (err: any) => {
	// 			console.warn(err);
	// 		})
	// 	//this.core.ipcRenderer.send('login-success')
	// }

	// status() {
	// 	this.core.authService.signedIn.subscribe((state) => {
	// 		console.log(state);
	// 	})
	// 	//this.core.ipcRenderer.send('login-success')
	// }

}
