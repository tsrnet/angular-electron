import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

export enum AuthErrorMessages {
	"auth/default" = "An error occurred while trying to log in with this account.",
	"auth/user-not-found" = "This account doesn't exist. Enter a different account or get a new one.",
	"auth/stored-user-not-found" = "This stored account doesn't exist. Enter a different account or get a new one.",
	"auth/user-disabled" = "The user account has been disabled by an administrator.",
	"auth/wrong-password" = "The password is invalid."
}

export interface AuthError {
	code: string;
	message: string;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	public signedIn: Observable<any>;

	constructor(public auth: AngularFireAuth) {
		this.signedIn = new Observable((subscriber) => {
			this.auth.onAuthStateChanged(subscriber);
		});
	}

	public logIn(email: string, password: string): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			this.auth.signInWithEmailAndPassword(email, password).then(
				((res) => resolve(true)),
				((err) => reject(this.getError(err.code)))
			);
		});
	}

	public signIn(email: string, password: string): Promise<boolean> {
		return new Promise<boolean>((resolve, reject) => {
			this.auth.signInWithEmailAndPassword(email, password).then(
				((res) => resolve(true)),
				((err) => reject(this.getError(err.code)))
			);
		});
	}

	public getError(errorCode: string): AuthError {
		let error: AuthError = { code: 'auth/default', message: AuthErrorMessages['auth/default']};
		if (AuthErrorMessages[errorCode] !== undefined) error = { code: errorCode, message: AuthErrorMessages[errorCode]};
		return error;
	}

	async signOut() {
		try {
			await this.auth.signOut();
			return true;
		} catch (error) {
			console.log('Sign out failed', error);
			return false;
		}
	}

	async createAccount(email: string, password: string) {
		this.auth.createUserWithEmailAndPassword(email, password)
		.then((user) => {
			// Signed in
			// ...
		})
		.catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			// ..
		});
	}

}
