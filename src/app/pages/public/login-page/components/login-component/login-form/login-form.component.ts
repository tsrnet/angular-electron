import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../../../../../interfaces';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

	//data
	private _value: User = null;
	private _temporalValue: User = User.New();

	@Output() valueChange = new EventEmitter<User>();
	@Input() set value(value: User) {
		this._value = value;
		this.valueChange.emit(this._value);
	}
	get value(): User {
		return (this._value !== null) ? this._value : this._temporalValue;
	}

	@Output() onValid: EventEmitter<void> = new EventEmitter<void>();
	@Output() onInvalid: EventEmitter<void> = new EventEmitter<void>();

	//data control
	public email = new FormControl('', [Validators.required, Validators.email]);
	public password = new FormControl('', [Validators.required, Validators.pattern('^.{6,}$')]);

	//view control
	isEditMode: boolean = false;
	showPassword: boolean = false;
	showErrors: boolean = false;

	get isEmailInvalid() {
		return ((this.email !== null && this.email.invalid && !this.email.untouched) || this.showErrors);
	}

	get isPasswordInvalid() {
		return ((this.password !== null && this.password.invalid && !this.password.untouched) ||this.showErrors);
	}

	get emailErrorMessage(): string {
		if (this.isEmailInvalid) {
			if (this.email.hasError('required')) return 'You must enter a value';
			else if (this.email.hasError('email')) return 'Not a valid email';
		} else return '';
	}

	get passwordErrorMessage(): string {
		if (this.isPasswordInvalid) {
			if (this.password.hasError('required')) return 'You must enter a value';
			else if (this.password.hasError('pattern')) return 'Min 6 characters, numbers & letters';
		} else return '';
	}

	constructor() {
		let id = setInterval(() => {
			if (this._value !== null) {
				this.email.markAsUntouched();
				this.password.markAsUntouched();
				clearInterval(id);
			}
		}, 50);
	}

	public editMode(edit: boolean = true) {
		this.isEditMode = edit;
	}

	public checkValidity() {
		if (this.email.untouched && this.password.untouched) return;
		if (this.email.valid && this.password.valid) {
			this.onValid.emit();
		} else {
			this.onInvalid.emit();
		}
	}

	public togglePasswordVisibility() {
		this.showPassword = !this.showPassword;
	}

}
