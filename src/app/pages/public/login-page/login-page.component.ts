import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ElectronService } from '../../../services';
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

	constructor(private core: ElectronService) {
		this.retrieveStoredUsers();
	}

	public togglePasswordVisibility() {
		this.showPassword = !this.showPassword;
	}

	logIn() {
		console.log(this.storedUsers);
		return;
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
		let storedUsers: StoredUser[] = [
			{
				data: {
					email: 'sancheztorreon@gmail.com',
					password: 'talparacual',
					firstName: 'Antonio D.',
				},
				isLogged: true,
				prefered: false
			},
			{
				data: {
					email: 'garcilasomanolo@gmail.com',
					password: 'talparacual',
					firstName: 'Manolo',
					lastName: 'Garcia Jimenez',
					avatar: 'https://i.pinimg.com/originals/ee/58/aa/ee58aabca3bd1c5ed50b1ae03637b8db.jpg'
				},
				isLogged: true,
				prefered: false
			},
			{
				data: {
					email: 'codyjmc@gmail.com',
					password: 'talparacual',
					firstName: 'Jesus',
					lastName: 'Morales Caliz',
					avatar: 'https://avatarfiles.alphacoders.com/105/thumb-105382.jpg',
					lastSession: '15-12-2020 17:45'
				},
				isLogged: true,
				prefered: true
			}
		];

		storedUsers.forEach((storedUser: StoredUser) => {
			if (this.selectedUser === null && storedUser.prefered) this.selectedUser = storedUser;
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
