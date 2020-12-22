import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StoredUser } from '../../../../../interfaces';
import { ElectronService } from '../../../../../services';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from './templates/dialog-confirm.component';

@Component({
	selector: 'app-login-select',
	templateUrl: './login-select.component.html',
	styleUrls: ['./login-select.component.scss'],
	animations: [
		trigger('openClose', [
			state('open', style({
				height: '263px'
			})),
			state('closed', style({
				height: '0px'
			})),
			transition('open => closed', [
				animate('150ms cubic-bezier(0.4,0.0,0.2,1)'),
			]),
			transition('closed => open', [
				animate('150ms cubic-bezier(0.4,0.0,0.2,1)')
			]),
		]),
	]
})

export class LoginSelectComponent {

	private _value: StoredUser;
	private _storedUsers: StoredUser[]

	@Input() set value(val: StoredUser) {
		this.valueChange.emit(val);
		this._value = val;
	}

	@Output()
	valueChange: EventEmitter<StoredUser> = new EventEmitter<StoredUser>();

	get value() {
		return this._value;
	}

	@Input('collection') set storedUsers(storedUsers: StoredUser[]) {
		this._storedUsers = storedUsers;
		this.emptyList = (storedUsers.length > 0) ? false : true;
	}

	get storedUsers() {
		return this._storedUsers;
	}
	
	//select functionality
	public isOpen: boolean = false;
	public emptyList: boolean = true;

	constructor(public electron: ElectronService, public dialog: MatDialog) { }

	public onClick(storedUser?: StoredUser) {
		if (storedUser !== undefined) {
			if (this.value === storedUser) this.value = null;
			else this.value = storedUser;
		}
		this.isOpen = !this.isOpen;
	}

	public captureDoneEvent(event: any) {
		if (event.toState === 'closed') event.element.style.display = 'none';
		if (!this.emptyList && this.storedUsers.length == 0) this.emptyList = true;
	}

	public captureStartEvent(event: any) {
		if (event.fromState === 'closed') event.element.style.display = 'block';
	}

	public onDrop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.storedUsers, event.previousIndex, event.currentIndex);
	}

	public removeStoredUser(index: number) {
		const dialogRef = this.dialog.open(ConfirmDialog);
		dialogRef.afterClosed().subscribe((result: boolean) => {
			if (result) {
				if (this.storedUsers[index] === this.value) {
					this.value = null;
				} 
				this.storedUsers.splice(index, 1);
				if (this.storedUsers.length == 0) this.isOpen = false;
			} 
		});
	}

}