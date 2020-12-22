import { SuperObject } from "../superobject/superobject";

export class SuperStorage<T> {

    private _data: T[];
    private inpure: boolean = false;
    
    public get length(): number {
        return this._data.length;
    }
    public get empty(): boolean {
        return (this._data.length <= 0);
    }
    public get data(): T[] {
        return this._data;
    }

    constructor(inpure?: boolean) {
        this._data = [];
        this.inpure = inpure;
    }

    /**
     * Appends the specified element to the end of this list.
     * @param newItem Element to be appended to this list.
     */
    public add(newItem: T): SuperStorage<T> {
        this._data.push(newItem);
        return this;
    }

    /**
     * Appends all of the elements in the specified collection to the end of this list.
     * @param newItems Collection containing elements to be added to this list.
     */
    public addAll(newItems: T[]): SuperStorage<T> {
        if (newItems != undefined) this._data = this._data.concat(newItems);
        return this;
    }

    /**
     * Returns the element at the specified position in this list.
     * @param index Index of the element to return.
     * @returns The element at the specified position in this list.
     */
    public get(index: number): T {
        return (this._data.length < index) ? null : this._data[index];
    }
    
    public first(): T {
        return (this._data.length > 0) ? this._data[0] : null;
    }
    
    public last(): T {
        return (this._data.length > 0) ? this._data[this._data.length - 1] : null;
    }

    public remove(item: T): SuperStorage<T> {
        if (this.getIndex(item) > -1) this._data.splice(this.getIndex(item), 1);
        return this;
    }

    public clean(): SuperStorage<T> {
        this._data = [];
        return this;
    }

    public contains(item: T): boolean {
        return (this.getIndex(item) > -1) ? true : false;
    }

    public count(): number {
        return this._data.length;
    }

    public clone(): SuperStorage<T> {
        return SuperObject.clone(this);
    }
 
    public getIndex(item: T): number {
        if (!this.inpure) return this._data.indexOf(item, 0);
        else {
            for (let index = 0; index < this._data.length; index++) {
                const element = JSON.stringify(this._data[index]);
                if (element == JSON.stringify(item)) return index;
            } return -1;
        }
    }
}