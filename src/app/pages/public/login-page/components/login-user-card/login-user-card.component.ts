import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { LoginPageService } from '../../login-page.service';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
	selector: 'app-login-user-card',
	templateUrl: './login-user-card.component.html',
	styleUrls: ['./login-user-card.component.scss'],
	animations: [
		trigger('slide', [
			state('void', style({
				transform: 'translateX(0)'
			})),
			state('card', style({
				transform: 'translateX(0)'
			})),
			state('form', style({
				transform: 'translateX(111%)'
			})),
			transition('void => form', [
				animate('350ms cubic-bezier(0.4,0.0,0.2,1)'),
			]),
			transition('form => card', [
				animate('350ms cubic-bezier(0.4,0.0,0.2,1)'),
			]),
			transition('form => card', [
				animate('350ms cubic-bezier(0.4,0.0,0.2,1)'),
			]),
		]),
	]
})

export class LoginUserCardComponent {
	
	constructor(public loginPageService: LoginPageService) {}

}
