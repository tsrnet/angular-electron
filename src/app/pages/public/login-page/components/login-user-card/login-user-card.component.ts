import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { LoginPageService } from '../../login-page.service';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
	selector: 'app-login-user-card',
	templateUrl: './login-user-card.component.html',
	styleUrls: ['./login-user-card.component.scss'],
	animations: [
		trigger('fade', [
			state('out', style({
				transform: 'translateX(350px)',
				opacity: '0'
			})),
			state('in', style({
				transform: 'translateX(0px)',
				opacity: '1'
			})),
			state('void', style({
				transform: 'translateX(-350px)',
				opacity: '0'
			})),
			state('full', style({
				transform: 'translateX(0)',
				opacity: '1'
			})),
			transition('void => in', [
				animate('350ms cubic-bezier(0.4,0.0,0.2,1)'),
			]),
			transition('full => out', [
				animate('350ms cubic-bezier(0.4,0.0,0.2,1)'),
			]),
		]),
	]
})
export class LoginUserCardComponent implements AfterViewInit {
	@ViewChild('userForm') userForm: LoginFormComponent;

	private _step: 'out'|'in'|'void'|'full' = 'full';

	public get step() {
		if (this._step == 'out') return 'out';
		return (this.canShow) ? 'full' : 'void';
	}
	
	public get canShow() {
		return this.loginPageService.userCardCanShow;
	}

	public set canShow(canShow: boolean) {
		this.loginPageService.userCardCanShow = canShow;
	}
	
	constructor(public loginPageService: LoginPageService) {
	}
	
	ngAfterViewInit(): void {}

	public edit() {
		this._step = 'out';
	}

	public captureDoneEvent(event: any) {
		if (event.toState === 'out') this.canShow = false;
	}

}
