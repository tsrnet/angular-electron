import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { LoginPageService } from '../../../login-page.service';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
	selector: 'app-login-user-card',
	templateUrl: './login-user-card.component.html',
	styleUrls: ['./login-user-card.component.scss'],
	animations: [
		trigger('slide', [
			state('void-card', style({
				transform: 'translateX(0)'
			})),
			state('void-form', style({
				transform: 'translateX(115%)'
			})),
			state('card', style({
				transform: 'translateX(0)'
			})),
			state('form', style({
				transform: 'translateX(115%)'
			})),
			transition('void-card => form', [
				animate('350ms cubic-bezier(0.4,0.0,0.2,1)'),
			]),
			transition('form => card', [
				animate('350ms cubic-bezier(0.4,0.0,0.2,1)'),
			]),
		]),
	]
})

export class LoginUserCardComponent {

	private _editUser: boolean = false;
	
	public _step: 'void'|'card'|'form';

	public get step() {
		return (this.loginPageService.isSelectedUserStored) ? ((this._editUser) ? 'form' : 'void-card') : 'void-form';
	}

	@ViewChild('loginForm') loginForm: LoginFormComponent;
	
	constructor(public loginPageService: LoginPageService) {
	}
	
	public captureStartEvent(event: any) {
		// if (event.toState === 'void-card') event.element.style.display = 'block';
		// else if (event.fromState === 'open') event.element.style.pointerEvents = 'none';
	}

	public captureDoneEvent(event: any) {
		// if (event.toState === 'void-card') event.element.style.display = 'none';
		// else if (event.toState === 'open') event.element.style.pointerEvents = 'all';
		// this.emptyList = this.loginPageService.storedUsersIsEmpty;
	}

	public editUser() {
		console.log(this._editUser);
		
		this._editUser = true;
	}

}
