import { Injectable } from '@angular/core';
import { User } from '../../../interfaces';
import { UserLocalStorageService, UserStoreService } from '../../../services';

@Injectable({
	providedIn: 'root'
})
export class LoginPageService {

    /* User card and Uuser view logic */
    private _canShow: boolean = true;
    
    public get userCardCanShow(): boolean {
        return (this._canShow) ? this.existSelectedUser : this._canShow;
    }
    
    public set userCardCanShow(canShow: boolean) {
        this._canShow = canShow;
    }
    /* User card and Uuser view logic */

    public set selectedUser(newUser: User) {
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

	constructor(private _userStore: UserStoreService, private _userLocalStorage: UserLocalStorageService) {
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


}