import { Injectable } from '@angular/core';
import { StoredUser, User } from '../../../interfaces';
import { SuperStorage } from '../../../classes/superstorage/superstorage';
import { LocalStorageService } from '../localstorage/localstorage.service';
import { ElectronService } from '../../electron/electron.service';
import { SuperObject } from '../../../classes/superobject/superobject';

interface StoredUserCtrl {
    users: User[];
    preselectedUserId: number;
}

@Injectable({
	providedIn: 'root'
})
export class UserLocalStorageService {

    private storedUsersCtrl: StoredUserCtrl = {
        users: [],
        preselectedUserId: null
    }

    get users() {
        return this.storedUsersCtrl.users;
    }

    get preselectedUser() {
        return this.storedUsersCtrl.users[this.preselectedUserId];
    }

    get preselectedUserId() {
        return this.storedUsersCtrl.preselectedUserId;
    }

    get length() {
        return this.storedUsersCtrl.users.length;
    }

    constructor(private electron: ElectronService, private localStorage: LocalStorageService) {
        let storedUsersCtrl = this.localStorage.get('storedusers', (!this.electron.appConfig.production));
        if (!storedUsersCtrl) this.localStorage.add('storedusers', this.storedUsersCtrl, (!this.electron.appConfig.production));
        this.updateLocalStorage();
    }
    
    public store(user: User, preselected: boolean = false) {

        this.updateLocalStorage();
        let index: number;
        if (this.userExists(user)) index = this.indexOf(user);
        else index = this.length;


        this.storedUsersCtrl.users[index] = user;
        if (index == this.preselectedUserId) this.storedUsersCtrl.preselectedUserId = (preselected) ? index : this.preselectedUserId;
        this.localStorage.add('storedusers', this.storedUsersCtrl, (!this.electron.appConfig.production));

    }

    private userExists(user: User): boolean {
        let exist = false;
        let i = 0;
        do {
            if (SuperObject.isEquals(this.users[i], user)) exist = true;
            i++;
        } while (i <= this.length);
        return exist;
    }

    private indexOf(user: User): number {
        let index = -1;
        let i = 0;
        do {
            if (SuperObject.isEquals(this.users[i], user)) index = i;
            i++;
        } while (i <= this.length);
        return index
    }

    private updateLocalStorage() {
        this.storedUsersCtrl = this.localStorage.get('storedusers', (!this.electron.appConfig.production));
    }

    // private contains(user: StoredUser): boolean {
    //     let exist: boolean = false;
    //     this._users.data.forEach((storedUser: StoredUser) => {
    //         // if ()
    //     });
    //     return exist;
    // }







    public getPreselected() {
        let storedUsers = this.localStorage.get('storedusers', true);
    }
    
    // public add(propertyName: string, propertyValue: any, json: boolean = false): LocalStorageService {
    //     let pValue: any = (json) ? JSON.stringify(propertyValue) : propertyValue;
    //     localStorage.setItem(propertyName, pValue);
    //     return this;
    // }

    // public get(propertyName: string, json: boolean = false): any {
    //     let item = localStorage.getItem(propertyName);
    //     return (item != 'undefined') ? ((json) ? JSON.parse(item) : item) : false;
    // }

    // public exist(propertyName: string): boolean {
    //     return (this.get(propertyName)) ? true : false;
    // }

    // public remove(propertyName: string): LocalStorageService {
    //     localStorage.removeItem(propertyName);
    //     return this;
    // }

    // public count(): number {
    //     return localStorage.length;
    // }

    // public clear(): void {
    //     localStorage.clear();
    // }

}
