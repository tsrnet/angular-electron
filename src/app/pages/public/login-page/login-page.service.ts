import { Injectable } from '@angular/core';
import { User } from '../../../interfaces';
import { AuthError, AuthErrorCodes, AuthService, UserLocalStorageService, UserStoreService } from '../../../services';
import { ArrayOrder } from './components/login-component/login-select/login-select.component';

@Injectable({
	providedIn: 'root'
})
export class LoginPageService {

    //GLOBAL USAGE

    private _selectedUser: User = null;
    public isUserValid: boolean = null;

    public set selectedUser(newUser: User) {
        this._selectedUser = newUser;
        if (this._userLocalStorage.userExists(newUser)) this._userLocalStorage.store(newUser, true);
    }

    public get existSelectedUser(): boolean {
        return (this._selectedUser !== null);
    }

    public get selectedUser(): User {
        return this._selectedUser;
    }

    public get isSelectedUserStored(): boolean {
        return (this._userLocalStorage.userExists(this.selectedUser));
    }
    
    public get storedUsers() {
        return this._userLocalStorage.users;
    }

    public get storedUsersIsEmpty() {
        return this._userLocalStorage.isEmpty
    }

	constructor(private _authService: AuthService, private _userStore: UserStoreService, private _userLocalStorage: UserLocalStorageService) {
        // this._userStore.getAll().then((users) => {
		// 	users.forEach((user: User) => {                
		// 		this._userLocalStorage.store(user);
        //     })
		// })
        this._selectedUser = (this._userLocalStorage.existSelectedUser) ? this._userLocalStorage.selectedUser : User.New();
        this.isUserValid = this.isSelectedUserStored;
    }

    public deleteUser(storedUser: User): boolean {
        this._selectedUser = User.New();
        return this._userLocalStorage.delete(storedUser);
    }

    public moveItemInArray(arrayOrder: ArrayOrder): void {
        this._userLocalStorage.moveItemInArray(arrayOrder.fromIndex, arrayOrder.toIndex);
    }

    public deselectUser() {
        this._selectedUser = User.New();
        this._userLocalStorage.deletePreselectedUser();
    }

    public logWithEmailAndPassword() {
        return new Promise<boolean>((resolve, rejected) => {
            this._authService.logIn(this._selectedUser.email, this._selectedUser.password).then(
                (res: boolean) => {
                    if (res) {
                        this._userStore.getByEmail(this._selectedUser.email).then((retrievedUser: User) => {
                            if (this._selectedUser !== null) {
                                this.selectedUser = retrievedUser;
                                resolve(true);
                            } else resolve(false);
                        })
                    } else rejected(this._authService.getError((this.isSelectedUserStored) ? AuthErrorCodes.STORED_USER_NOT_FOUND : AuthErrorCodes.USER_NOT_FOUND));
                }, 
                (err: AuthError) => {
                    let error = err;
                    if (error.code == AuthErrorCodes.USER_NOT_FOUND) error = this._authService.getError((this.isSelectedUserStored) ? AuthErrorCodes.STORED_USER_NOT_FOUND : AuthErrorCodes.USER_NOT_FOUND);
                    rejected(error);
                }
            ).catch(((err) => rejected(err)))

        })
    }


}