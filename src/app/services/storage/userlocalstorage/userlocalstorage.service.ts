import { Injectable } from '@angular/core';
import { User } from '../../../interfaces';
import { LocalStorageService } from '../localstorage/localstorage.service';
import { ElectronService } from '../../electron/electron.service';

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
        preselectedUserId: 0
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

    public store(user: User, preselected: boolean = false): Promise<boolean> {
        return new Promise<boolean>((res, err) => {
            try {
                this.updateLocalStorage();
                let index: number = this.indexFor(user);
                this.storedUsersCtrl.users[index] = user;
                if (index == this.preselectedUserId) this.storedUsersCtrl.preselectedUserId = (preselected) ? index : 0;
                this.localStorage.add('storedusers', this.storedUsersCtrl, (!this.electron.appConfig.production));
                res(this.userExists(user));
            } catch (error) {
                err(false);
            }
        });
    }

    public delete(user: User): Promise<boolean> {
        return new Promise<boolean>((res, err) => {
            try {
                this.updateLocalStorage();
                if (!this.userExists(user)) res(false);
                let index = this.indexFor(user);
                this.storedUsersCtrl.users.splice(index, 1);
                if (index == this.preselectedUserId) this.storedUsersCtrl.preselectedUserId = 0;
                this.localStorage.add('storedusers', this.storedUsersCtrl, (!this.electron.appConfig.production));
                res(true);
            } catch (error) {
                err(false);
            }
        });
    }

    public getAll() {
        this.updateLocalStorage();
        return this.storedUsersCtrl.users;
    }

    private userExists(user: User): boolean {
        let exist = false;
        if (this.length == 0) return exist;
        let i = 0;
        do {
            if (this.storedUsersCtrl.users[i].userId === user.userId) exist = true;
            i++;
        } while (i < this.length);
        return exist;
    }

    /**
     * This method return a index for the user specified. If the user exist alredy, it return the index of that user.
     * @param user User that needs a index.  
     */
    private indexFor(user: User): number {
        //By default, the length of the users array is the index for the "new to be" user.
        let index = this.length;
        //If the index is cero, there arent any items on the array. Wich means that 0 is de index for the new user.
        if (!index) return index;
        //This loop search for existant users comparating its id's. The loops end in the exact moment when its find a existing user.
        let i = 0;
        do {
            if (this.storedUsersCtrl.users[i].userId === user.userId) index = i;
            i++;
        } while (i < this.length);
        return index;
    }

    private updateLocalStorage() {
        this.storedUsersCtrl = this.localStorage.get('storedusers', (!this.electron.appConfig.production));
    }

}
