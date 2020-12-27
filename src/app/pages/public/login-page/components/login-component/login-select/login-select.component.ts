import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from './templates/dialog-confirm.component';
import { User } from '../../../../../../interfaces';

export interface ArrayOrder {
	fromIndex: number;
	toIndex: number;
}

@Component({
	selector: 'app-login-user-select',
	templateUrl: './login-select.component.html',
	styleUrls: ['./login-select.component.scss'],
	animations: [
		trigger('openClose', [
			state('open', style({
				height: '263px',
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

	@Input('data') users: User[] = [];
	@Input() disabled: boolean = false;

	private _value: User = null;
	@Input() set value(value: User) {
		this._value = value;
	}
	get value(): User {
		return this._value;
	}
	
	@Output() onDelete: EventEmitter<User> = new EventEmitter<User>();
	@Output() onDeselect: EventEmitter<void> = new EventEmitter<void>();
	@Output() onSelect: EventEmitter<User> = new EventEmitter<User>();
	@Output() onOrderChanges: EventEmitter<ArrayOrder> = new EventEmitter<ArrayOrder>();
	
	//select functionality
	public get existSelectedUser(): boolean {
		return (this._value !== null);
	}
	public isOpen: boolean = false;
	public emptyList: boolean = true;
	
	constructor(public dialog: MatDialog) {
	}
	
	public onClickEvent(user?: User) {
		if (user !== null && user !== undefined) {
			if (this._value?.userId == user.userId) this.onDeselect.emit();
			else this.onSelect.emit(user);
			this.emptyList = (this.users.length == 0);
		}
		this.isOpen = !this.isOpen;
	}

	public onOrderChangesEvent(fromIndex: number, toIndex: number) {
		this.onOrderChanges.emit({fromIndex: fromIndex, toIndex: toIndex});
	}

	public onDeleteEvent(user: User) {
		const dialogRef = this.dialog.open(ConfirmDialog);
		dialogRef.afterClosed().subscribe((result: boolean) => {
			if (result) {
				this.onDelete.emit(user);
				if (this.users.length == 0) this.isOpen = false;
			} 
		});
	}

	public onDoneEvent(event: any) {
		if (event.toState === 'closed') event.element.style.display = 'none';
		else if (event.toState === 'open') event.element.style.pointerEvents = 'all';
		this.emptyList = (this.users.length == 0);
	}

	public onStartEvent(event: any) {
		if (event.fromState === 'closed') event.element.style.display = 'block';
		else if (event.fromState === 'open') event.element.style.pointerEvents = 'none';
	}


}