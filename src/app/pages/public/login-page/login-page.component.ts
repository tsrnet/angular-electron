import { Component, ViewChild } from '@angular/core';
import { ElectronService } from '../../../services';
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

	constructor(private core: ElectronService, public loginPageService: LoginPageService) {}

	onClick() {
		console.log(this.loginForm);
		if (!this.loginPageService.existSelectedUser && !this.loginPageService.isNewUserValid) this.loginForm.showErrors = true;
		console.log(this.loginForm.showErrors);
	}

	logIn() {
		return;
		this.showSpinner = true;
		this.core.authService.signIn(this.loginPageService.selectedUser.email, this.loginPageService.selectedUser.password).then(
			(res: boolean) => {
				this.showSpinner = false;
				console.log(res);
				if (res) {
					this.core.authService.signOut().then(
						(res: boolean) => {
							console.log(res);
						}, (err: any) => {
							console.warn(err);
						})
					}
			}, (err: any) => {
				this.showSpinner = false;
				console.warn(err);
			}
		)
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

}
