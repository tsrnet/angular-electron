import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ElectronService, UserLocalStorageService } from '../../../services';
import { StoredUser, User } from '../../../interfaces/index';

@Component({
	selector: 'app-login-page',
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

	//data
	email = new FormControl('', [Validators.required, Validators.email]);
	password = new FormControl('', [Validators.required, Validators.pattern('^.{6,}$')]);
	selectedUser: StoredUser = null;
	storedUsers: StoredUser[];

	//view
	showPassword: boolean = false;
	showSpinner: boolean = false;

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

	constructor(private core: ElectronService, private userLocalStorage: UserLocalStorageService) {
		this.retrieveStoredUsers();
	}

	public togglePasswordVisibility() {
		this.showPassword = !this.showPassword;
	}

	logIn() {
		this.showSpinner = true;
		this.core.authService.signIn(this.selectedUser.data.email, this.selectedUser.data.password).then(
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

	public retrieveStoredUsers() {
		this.userLocalStorage.store(User.New({
			userId: 1549,
			providerId: 'telegram',
			email: 'thegravewalker@gmail.com',
			password: 'newpassword',
			userName: 'Inventado#1584',
			firstName: 'Inventado',
			lastName: 'Invencio'
		})).then((res)=> {
			console.log(res);
		});

		let storedUsers: StoredUser[] = [];

		storedUsers.forEach((storedUser: StoredUser) => {
			if (this.selectedUser === null && storedUser.preselected) this.selectedUser = storedUser;
		})
		this.storedUsers = storedUsers;
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
