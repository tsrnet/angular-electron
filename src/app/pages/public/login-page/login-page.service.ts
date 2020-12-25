import { Injectable } from '@angular/core';
import { User } from '../../../interfaces';
import { AuthError, AuthErrorCodes, AuthService, UserLocalStorageService, UserStoreService } from '../../../services';

@Injectable({
	providedIn: 'root'
})
export class LoginPageService {

    //LOGINFORM-LOGINPAGE USAGE
    public newUser: User = null;

    
    public get isNewUserValid() {
        return (this.newUser !== null);
    }

    //LOGINFORM-LOGINPAGE USAGE

    //GLOBAL USAGE
    public set selectedUser(newUser: User) {
        this.newUser = null;
        this._userLocalStorage.store(newUser, true);
    }

    public get selectedUser(): User {
        return this._userLocalStorage.preselectedUser;
    }

    public get existSelectedUser(): boolean {
        return (this.selectedUser !== null) ? true : false;
    }
    
    public get storedUsers() {
        return this._userLocalStorage.users;
    }

    public get storedUsersLength() {
        return this._userLocalStorage.length;
    }

    public get storedUsersIsEmpty() {
        return this._userLocalStorage.isEmpty
    }

	constructor(private _authService: AuthService, private _userStore: UserStoreService, private _userLocalStorage: UserLocalStorageService) {
    }

    public deleteUser(storedUser: User): Promise<boolean> {
        return this._userLocalStorage.delete(storedUser);
    }

    public moveItemInArray(old_index: number, new_index: number): void {
        this._userLocalStorage.moveItemInArray(old_index, new_index);
    }

    public deselectUser() {
        this._userLocalStorage.deletePreselectedUser();
    }

    public logWithEmailAndPassword() {
        let user = (this.existSelectedUser) ? this.selectedUser : this.newUser;
        return new Promise<boolean>((resolve, rejected) => {
            this._authService.logIn(user.email, user.password).then(
                (res: boolean) => {
                    if (res) {
                        this._userStore.getByEmail(user.email).then((retrievedUser: User) => {
                            if (user !== null) {
                                this.selectedUser = retrievedUser;
                                resolve(true);
                            } else resolve(false);
                        })
                    } else rejected(this._authService.getError((this.existSelectedUser) ? AuthErrorCodes.STORED_USER_NOT_FOUND : AuthErrorCodes.USER_NOT_FOUND));
                }, 
                (err: AuthError) => {
                    let error = err;
                    if (error.code == AuthErrorCodes.USER_NOT_FOUND) error = this._authService.getError((this.existSelectedUser) ? AuthErrorCodes.STORED_USER_NOT_FOUND : AuthErrorCodes.USER_NOT_FOUND);
                    rejected(error);
                }
            ).catch(((err) => rejected(err)))

        })
    }


}