import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { StoredUser } from '../../../../../interfaces';
import { ElectronService } from '../../../../../services';
import { Subject } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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

	@Input() set value(val: StoredUser) {
		this.valueChange.emit(val);
		this._value = val;
	}

	@Output()
	valueChange: EventEmitter<StoredUser> = new EventEmitter<StoredUser>();

	get value() {
		return this._value;
	}

	@Input('collection') storedUsers: StoredUser[];

	//select functionality
	_bodyAnimationDone = new Subject<AnimationEvent>();
	public isOpen: boolean = false;

	constructor(public electron: ElectronService) { }

	public onClick(storedUser?: StoredUser) {
		if (storedUser !== undefined) {
			if (this.value === storedUser) return;
			else this.value = storedUser;
		}
		this.isOpen = !this.isOpen;
	}

	public getStoredUserAvatar(storedUser: StoredUser): string {
		let avatar = (storedUser.data.avatar) ? storedUser.data.avatar : '';
		if (avatar === '') avatar = 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg';
		return avatar;
	}

	public getStoredUserFullName(storedUser: StoredUser): string {
		let user = storedUser.data;
		let fullName = user.firstName.trimRight();
		if (user.lastName) fullName += ' ' + user.lastName.trimLeft();
		return fullName;
	}

	public captureDoneEvent(event: any) {
		if (event.toState === 'closed') event.element.style.display = 'none';
	}

	public captureStartEvent(event: any) {
		if (event.fromState === 'closed') event.element.style.display = 'block';
	}

	public onDrop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.storedUsers, event.previousIndex, event.currentIndex);
	}

}
