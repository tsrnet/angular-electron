import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {

    constructor() {}
    
    public add(key: string, value: any, json: boolean = false): LocalStorageService {
        let pValue: any = (json) ? JSON.stringify(value) : value;
        localStorage.setItem(key, pValue);
        return this;
    }

    public get(key: string, json: boolean = false): any {
        let item = localStorage.getItem(key);
        return (item != 'undefined') ? ((json) ? JSON.parse(item) : item) : null;
    }

    public exist(key: string): boolean {
        return (this.get(key) !== null);
    }

    public remove(key: string): LocalStorageService {
        localStorage.removeItem(key);
        return this;
    }

    public length(): number {
        return localStorage.length;
    }

    public clear(): void {
        localStorage.clear();
    }

}
