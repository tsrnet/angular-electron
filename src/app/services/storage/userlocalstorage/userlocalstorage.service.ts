import { Injectable } from '@angular/core';
import { User } from '../../../interfaces';
import { LocalStorageService } from '../localstorage/localstorage.service';
import { ElectronService } from '../../electron/electron.service';
import { from } from 'rxjs';

interface StoredUserCtrl {
    id: number;
    data: User[];
    preselectedId: number;
}

@Injectable({
    providedIn: 'root'
})
export class UserLocalStorageService {

    private ID: number;

    private _storedUsers: StoredUserCtrl = {
        id: 1,
        data: [],
        preselectedId: null
    }
    private _preselectedUser: User = null;

    get users() {
        return this._storedUsers.data;
    }

    get preselectedUser(): User {
        return this._preselectedUser??null;
    }

    get preselectedId(): number {
        return this._storedUsers.preselectedId;
    }

    set preselectedId(newId: number) {
        this._preselectedUser = this.getById(newId);
        this._storedUsers.preselectedId = newId;
    }

    get length(): number {
        return this._storedUsers.data.length;
    }

    get isEmpty(): boolean {
        return (this.length === 0);
    }

    get firstItemId(): number {
        return this._storedUsers.data[0]?.userId??-1;
    }

    constructor(private electron: ElectronService, private localStorage: LocalStorageService) {
        this.initializeLocalStorage();
    }

    /**
     * Add or update the user to the local storage.
     * @param user User to add or update
     * @param preselected Select this user as preselect
     */
    public store(user: User, preselected: boolean = false): Promise<boolean> {
        return new Promise<boolean>((res, err) => {
            try {
                this.retrieveLocalStorage();
                let index: number = this.indexFor(user);
                this._storedUsers.data[index] = user;
                if (preselected) this.preselectedId = user.userId;
                this.updateLocalStorage();
                res(!this.userExists(user));
            } catch (error) {
                err(error);
            }
        });
    }

    public deletePreselectedUser() {
        this.preselectedId = null;
        this.updateLocalStorage();
    }

    public delete(user: User): Promise<boolean> {
        return new Promise<boolean>((res, err) => {
            try {
                this.retrieveLocalStorage();
                if (!this.userExists(user)) res(false);
                let index = this.indexFor(user);
                this._storedUsers.data.splice(index, 1);
                if (this.preselectedId == user.userId) this.preselectedId = null;
                this.updateLocalStorage();
                res(true);
            } catch (error) {
                err(false);
            }
        });
    }

    public getAll() {
        this.retrieveLocalStorage();
        return this._storedUsers.data;
    }


    /**
     * Moves an item one index in an array to another.
     * @param fromIndex Starting index of the item.
     * @param toIndex Index to which the item should be moved.
     */
    public moveItemInArray(old_index: number, new_index: number): void {
        if (new_index >= this._storedUsers.data.length) {
            var i = new_index - this._storedUsers.data.length + 1;
            while (i--) {
                this._storedUsers.data.push(undefined);
            }
        }
        this._storedUsers.data.splice(new_index, 0, this._storedUsers.data.splice(old_index, 1)[0]);
        this.updateLocalStorage();
    }


    private getById(userId: number): User {
        let user = this._storedUsers.data.find(((user) => user.userId == userId));
        return (user) ? user : null;
    }

    /**
     * Searches the user in the array.
     * @param user User to find
     * @returns true or false
     */
    public userExists(user: User): boolean {
        if (user.userId == null) return false;
        return (this.getById(user.userId)) ? true : false;
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
            if (this._storedUsers.data[i].userId === user.userId) index = i;
            i++;
        } while (i < this.length);
        return index;
    }

    private generateID(previousID: number): number {
        let ID = Math.floor((Math.random() * 1000) + 1);
        if (previousID == ID) ID = this.generateID(previousID);
        return ID;
    }

    private getFromLocalStorage(): StoredUserCtrl {
        let rawStoredUsers: StoredUserCtrl = this.localStorage.get('storedusers', (!this.electron.appConfig.production));
        let storedUsers: StoredUserCtrl = {id: 1, data: [], preselectedId: null}

        if (rawStoredUsers !== null) {
            storedUsers.id = this.generateID(rawStoredUsers.id);
            rawStoredUsers.data.forEach(((user: User) => storedUsers.data.push(User.New(user))));
            storedUsers.preselectedId = rawStoredUsers.preselectedId;
        }

        return storedUsers;
    }

    private updateLocalStorage() {
        this.localStorage.add('storedusers', this._storedUsers, (!this.electron.appConfig.production));
        this.retrieveLocalStorage();
    }

    private retrieveLocalStorage() {
        this._storedUsers = this.getFromLocalStorage();
        if (this.preselectedId === -1) this.preselectedId = this.firstItemId;
        this._preselectedUser = this.getById(this.preselectedId);
    }

    private initializeLocalStorage() {
        this._storedUsers = this.getFromLocalStorage();
        this.updateLocalStorage();
    }

}
