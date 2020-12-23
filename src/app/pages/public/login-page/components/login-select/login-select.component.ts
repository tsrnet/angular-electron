import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { User } from '../../../../../interfaces';
import { ElectronService } from '../../../../../services';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from './templates/dialog-confirm.component';
import { LoginPageService } from '../../login-page.service';

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
	
	//select functionality
	public isOpen: boolean = false;
	public emptyList: boolean = true;
	
	constructor(public electron: ElectronService, public loginPageService: LoginPageService, public dialog: MatDialog) {
	}
	
	public onClick(storedUser?: User) {
		if (storedUser !== undefined) {
			if (this.loginPageService.existSelectedUser && this.loginPageService.selectedUser.userId == storedUser.userId) this.loginPageService.deselectUser();
			else {
				this.loginPageService.userCardCanShow = true;
				this.loginPageService.selectedUser = storedUser;
			} 
		}
		this.emptyList = this.loginPageService.storedUsersIsEmpty;
		this.isOpen = !this.isOpen;
	}

	public captureDoneEvent(event: any) {
		if (event.toState === 'closed') event.element.style.display = 'none';
		this.emptyList = this.loginPageService.storedUsersIsEmpty;
	}

	public captureStartEvent(event: any) {
		if (event.fromState === 'closed') event.element.style.display = 'block';
	}

	public deleteStoredUser(storedUser: User) {
		const dialogRef = this.dialog.open(ConfirmDialog);
		dialogRef.afterClosed().subscribe((result: boolean) => {
			if (result) this.loginPageService.deleteUser(storedUser).then((res: boolean) => {
				if (this.loginPageService.storedUsersIsEmpty) this.isOpen = false;
			});
		});
	}

}