import { Component, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { AuthError, AuthErrorCodes } from '../../../services';
import { LoginUserCardComponent } from './components/login-component/login-user-card/login-user-card.component';
import { LoginPageService } from './login-page.service';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

	@ViewChild('userCard') userCard: LoginUserCardComponent;

	//view
	showPassword: boolean = false;
	showSpinner: boolean = false;

	constructor(public loginPageService: LoginPageService, private _snackBar: MatSnackBar) { }

	onClick() {
		// if (!this.loginPageService.isUserValid) this.userCard.loginForm.showErrors = true;
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
				// if (err.code == AuthErrorCodes.WRONG_PASSWORD) this.userCard.loginForm.editUserPassword();
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