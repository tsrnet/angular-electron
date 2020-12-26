import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from './templates/dialog-confirm.component';
import { ElectronService } from '../../../../../../services';
import { User } from '../../../../../../interfaces';
import { LoginPageService } from '../../../login-page.service';

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

	@Input() value: User;
	@Output() valueChange = new EventEmitter<User>();
	
	@Output() onDelete: EventEmitter<User> = new EventEmitter<User>();
	
	//select functionality
	public isOpen: boolean = false;
	public emptyList: boolean = true;
	
	constructor(public loginPageService: LoginPageService, public dialog: MatDialog) {
	}
	
	public onClick(storedUser?: User) {
		if (storedUser !== undefined) {
			if (this.loginPageService.selectedUser.userId == storedUser.userId) this.loginPageService.deselectUser();
			else this.loginPageService.selectedUser = storedUser;
			this.emptyList = this.loginPageService.storedUsersIsEmpty;
		}
		this.isOpen = !this.isOpen;
	}

	public captureDoneEvent(event: any) {
		if (event.toState === 'closed') event.element.style.display = 'none';
		else if (event.toState === 'open') event.element.style.pointerEvents = 'all';
		this.emptyList = this.loginPageService.storedUsersIsEmpty;
	}

	public captureStartEvent(event: any) {
		if (event.fromState === 'closed') event.element.style.display = 'block';
		else if (event.fromState === 'open') event.element.style.pointerEvents = 'none';
	}

	public deleteStoredUser(storedUser: User) {
		const dialogRef = this.dialog.open(ConfirmDialog);
		dialogRef.afterClosed().subscribe((result: boolean) => {
			if (result) {
				this.loginPageService.deleteUser(storedUser)
				if (this.loginPageService.storedUsersIsEmpty) this.isOpen = false;
			} 
		});
	}

}