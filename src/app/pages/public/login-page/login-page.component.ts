import { Component, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { AuthError, AuthErrorCodes } from '../../../services';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginPageService } from './login-page.service';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

	@ViewChild('loginForm') loginForm: LoginFormComponent;

	//view
	showPassword: boolean = false;
	showSpinner: boolean = false;
	get isDisabled() {
		let isDisabled = true;
		if (this.loginPageService.existSelectedUser) isDisabled = false;
		if (this.loginPageService.isNewUserValid) isDisabled = false;
		return isDisabled;
	}

	constructor(public loginPageService: LoginPageService, private _snackBar: MatSnackBar) { }

	onClick() {
		if (!this.loginPageService.existSelectedUser && !this.loginPageService.isNewUserValid) this.loginForm.showErrors = true;
	}

	logIn() {
		this.showSpinner = true;
		this.loginPageService.logWithEmailAndPassword().then(
			(res: boolean) => {
				if (res) this.showSpinner = false;
				else {
					this.showSpinner = false;
				}
			},
			(err: AuthError) => {
				this.showSpinner = false;
				this.openSnackBar(err.message, 'OK');
				if (err.code == AuthErrorCodes.WRONG_PASSWORD) this.loginForm.editUserPassword();
			}
		)
	}

	openSnackBar(message: string, actionText: string): MatSnackBarRef<TextOnlySnackBar> {
		return this._snackBar.open(message, actionText, {
		  duration: 5000,
		  politeness: 'assertive'
		});
	}


}
// public retrieveStoredUsers() {
// 	this.userStore.getAll().then((users) => {
// 		users.forEach((user: User) => {
// 			this.storedUsers.store(user);
// 		})
// 	})
// }

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