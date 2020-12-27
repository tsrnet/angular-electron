import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../../../interfaces';

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

	private _value: User = null;
	@Input() set value(value: User) {
		this._value = value;
	}
	get value(): User {
		return this._value;
	}
	
	@Output() onEditClick: EventEmitter<void> = new EventEmitter<void>();
	
	constructor() {
	}
	
	public onStartEvent(event: any) {
		// if (event.toState === 'void-card') event.element.style.display = 'block';
		// else if (event.fromState === 'open') event.element.style.pointerEvents = 'none';
	}

	public onDoneEvent(event: any) {

	}

	public onEditClickEvent() {
		this.onEditClick.emit();
	}

}
