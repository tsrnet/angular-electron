import { Injectable } from '@angular/core';
import { User } from '../../../interfaces';
import { LocalStorageService } from '../localstorage/localstorage.service';
import { ElectronService } from '../../electron/electron.service';
import { from } from 'rxjs';

interface StoredUsersCtrl {
    id: number;
    data: User[];
    selectedUserId: number;
}

@Injectable({
    providedIn: 'root'
})
export class UserLocalStorageService {

    private ID: number;

    private _storedUsersCtrl: StoredUsersCtrl = {
        id: 1,
        data: [],
        selectedUserId: null
    };

    get users(): User[] {
        return this._storedUsersCtrl?.data;
    }

    get selectedUser(): User {
        return this.getById(this.selectedUserId);
    }

    get selectedUserId(): number {
        return this._storedUsersCtrl.selectedUserId;
    }

    set selectedUserId(newId: number) {
        this._storedUsersCtrl.selectedUserId = newId;
    }

    get existSelectedUser(): boolean {
        return (this.selectedUserId !== null);
    }

    get isEmpty(): boolean {
        return (this._storedUsersCtrl?.data.length === 0);
    }

    get length(): number {
        return (this.isEmpty) ? 0 : this._storedUsersCtrl.data.length;
    }
    
    constructor(private electron: ElectronService, private localStorage: LocalStorageService) {
        this.initializeLocalStorage();
    }
    
     test = [];

    /**
     * Add or update the user to the local storage.
     * @param user User to add or update
     * @param selected Select this user as preselect
     */
    public store(user: User, selected: boolean = false): void {        
        this._storedUsersCtrl.data[this.indexFor(user)] = user;
        console.log(user, this.indexFor(user));
        if (selected) this.selectedUserId = user.userId;
        this.updateLocalStorage();
    }
    
    public deletePreselectedUser() {
        this.selectedUserId = null;
        this.updateLocalStorage();
    }
    
    public delete(user: User): boolean {
        if (!this.userExists(user)) return false;
        this._storedUsersCtrl.data.splice(this.indexFor(user), 1);
        if (this.selectedUserId == user.userId) this.selectedUserId = null;
        this.updateLocalStorage();
        return true;
    }
    
    /**
     * Moves an item one index in an array to another.
     * @param fromIndex Starting index of the item.
     * @param toIndex Index to which the item should be moved.
     */
    public moveItemInArray(old_index: number, new_index: number): void {
        if (new_index >= this._storedUsersCtrl.data.length) {
            var i = new_index - this._storedUsersCtrl.data.length + 1;
            while (i--) {
                this._storedUsersCtrl.data.push(undefined);
            }
        }
        this._storedUsersCtrl.data.splice(new_index, 0, this._storedUsersCtrl.data.splice(old_index, 1)[0]);
        this.updateLocalStorage();
    }
    
    
    private getById(userId: number): User {
        let user = this._storedUsersCtrl.data.find(((user) => user.userId == userId));
        return (user) ? user : null;
    }
    
    /**
     * Searches the user in the array.
     * @param user User to find
     * @returns true or false
     */
    public userExists(user: User): boolean {
        if (user?.userId == null) return false;
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
        if (!index) {
            return index;
        } 
        //This loop search for existant users comparating its id's. The loops end in the exact moment when its find a existing user.
        let i = 0;
        do {
            if (this._storedUsersCtrl.data[i].userId == user.userId) index = i;
            i++;
        } while (i < this.length);
        
        return index;
    }

    private generateID(previousID: number): number {
        let ID = Math.floor((Math.random() * 1000) + 1);
        if (previousID == ID) ID = this.generateID(previousID);
        return ID;
    }

    private getFromLocalStorage(): StoredUsersCtrl {
        let rawStoredUsers: StoredUsersCtrl = this.localStorage.get('storedusers', (!this.electron.appConfig.production));
        let storedUsers: StoredUsersCtrl = {
            id: 1,
            data: [],
            selectedUserId: null
        };
        
        if (rawStoredUsers !== null) {
            storedUsers.id = this.generateID(rawStoredUsers.id);
            rawStoredUsers.data.forEach(((user: User) => storedUsers.data.push(User.New(user))));
            storedUsers.selectedUserId = rawStoredUsers.selectedUserId;
        }
        return storedUsers;
    }

    private updateLocalStorage() {
        this.localStorage.add('storedusers', this._storedUsersCtrl, (!this.electron.appConfig.production));
        this.retrieveLocalStorage();
    }

    private retrieveLocalStorage() {
        this._storedUsersCtrl = this.getFromLocalStorage();
    }

    private initializeLocalStorage() {
        this.retrieveLocalStorage();
        this.updateLocalStorage();
    }

}
