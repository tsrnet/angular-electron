import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {

    constructor() {}
    
    public add(propertyName: string, propertyValue: any, json: boolean = false): LocalStorageService {
        let pValue: any = (json) ? JSON.stringify(propertyValue) : propertyValue;
        localStorage.setItem(propertyName, pValue);
        return this;
    }

    public get(propertyName: string, json: boolean = false): any {
        let item = localStorage.getItem(propertyName);
        return (item != 'undefined') ? ((json) ? JSON.parse(item) : item) : false;
    }

    public exist(propertyName: string): boolean {
        return (this.get(propertyName)) ? true : false;
    }

    public remove(propertyName: string): LocalStorageService {
        localStorage.removeItem(propertyName);
        return this;
    }

    public length(): number {
        return localStorage.length;
    }

    public clear(): void {
        localStorage.clear();
    }

}
