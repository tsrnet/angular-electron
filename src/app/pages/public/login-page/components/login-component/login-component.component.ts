import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { User } from '../../../../../interfaces';
import { LoginPageService } from '../../login-page.service';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginSelectComponent } from './login-select/login-select.component';
import { LoginUserCardComponent } from './login-user-card/login-user-card.component';

enum BTN_MESSAGES {
	EDIT = 'Save',
	LOGIN = 'Log in'
}

@Component({
	selector: 'app-login-component',
	templateUrl: './login-component.component.html',
	styleUrls: ['./login-component.component.scss'],
	animations: [
		trigger('slide', [
			state('form', style({
				transform: 'translateX(0)',
			})),
			state('card', style({
				transform: 'translateX(calc(-50% - 18px))',
			})),
			state('toForm', style({
				transform: 'translateX(0)',
			})),
			state('toCard', style({
				transform: 'translateX(calc(-50% - 18px))',
			})),
			transition('* => toForm', [
				animate('150ms cubic-bezier(0.4,0.0,0.2,1)'),
			]),
			transition('* => toCard', [
				animate('150ms cubic-bezier(0.4,0.0,0.2,1)')
			]),
		]),
		trigger('fadeForm', [
			state('in', style({
				opacity: '1',
			})),
			state('out', style({
				opacity: '0',
			})),
			transition('* => in', [
				animate('150ms cubic-bezier(0.4,0.0,0.2,1)'),
			]),
			transition('* => out', [
				animate('150ms cubic-bezier(0.4,0.0,0.2,1)')
			]),
		]),
		trigger('fadeCard', [
			state('in', style({
				opacity: '1',
			})),
			state('out', style({
				opacity: '0',
			})),
			transition('* => in', [
				animate('150ms cubic-bezier(0.4,0.0,0.2,1)'),
			]),
			transition('* => out', [
				animate('150ms cubic-bezier(0.4,0.0,0.2,1)')
			]),
		])
	]
})
export class LoginComponentComponent {

	@ViewChild('userSelect') userSelect: LoginSelectComponent;
	@ViewChild('userForm') userForm: LoginFormComponent;
	@ViewChild('userCard') userCard: LoginUserCardComponent;

	public userDataStep: 'form'|'card'|'toForm'|'toCard' = 'card';
	public userFormStep: 'in'|'out' = 'in';
	public btnText: BTN_MESSAGES = BTN_MESSAGES.LOGIN;
	public btnDisabled: boolean = false;

	private isEditMode: boolean = false;

	public showUserForm: boolean = false;
	public showUserCard: boolean = true;
	
	constructor(public loginPageService: LoginPageService) {
		this.userDataStep = (this.loginPageService.isSelectedUserStored) ? 'card' : 'form';
		this.showUserCard = this.loginPageService.isSelectedUserStored;
		this.showUserForm = !this.showUserCard;
	}

	public onSelect(user: User) {
		this.btnDisabled = false;
		this.showUserForm = false;
		if (this.userDataStep != 'card') this.userDataStep = 'card';
		this.loginPageService.selectedUser = user;
	}
	
	public onDeselect() {
		this.btnDisabled = true;
		this.showUserCard = false;
		if (this.userDataStep != 'form') this.userDataStep = 'form';
		this.loginPageService.deselectUser();
		
	}

	public onBtnClick() {
		if (this.isEditMode) {
			this.isEditMode = false;
			this.userDataStep = 'toCard';
			this.userForm.editMode();
		} else {

		}
	}

	public onEditClick() {
		this.isEditMode = true;
		this.userDataStep = 'toForm';
	}

	public onDoneEvent(event: AnimationEvent) {
		if (event.toState == 'toForm') {
			this.userDataStep = 'form';
			// this.toggleElementDisplay(event.element.children[1], 'hidden');
			this.showUserCard = false;
			this.btnText = BTN_MESSAGES.EDIT;
		} 
		if (event.toState == 'toCard') {
			this.userDataStep = 'card';
			this.showUserForm = false;
			this.btnText = BTN_MESSAGES.LOGIN;
		} 
	}
	
	public onStartEvent(event: AnimationEvent) {
		if (event.toState == 'toCard') {
			this.showUserCard = true;
		}
		if (event.toState == 'toForm') {
			this.showUserForm = true;
		}
		if (event.toState == 'form') {
			this.showUserForm = true;
		}
		if (event.toState == 'card') {
			this.showUserCard = true;
		}
	}

	private toggleElementDisplay(element: HTMLElement, visibility: string = 'visible') {
		 element.style.visibility = visibility;
	}

}
