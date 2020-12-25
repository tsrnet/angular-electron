import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'tsr-button',
	templateUrl: './tsr-button.component.html',
	styleUrls: ['./tsr-button.component.scss']
})
export class TsrButtonComponent {

	@Input() disabled: boolean = false;
	@Output() onDisabledClick = new EventEmitter<boolean>();
	@Output() onClick = new EventEmitter<boolean>();

	constructor() {}

	manageClick() {
		if (this.disabled) this.onDisabledClick.emit(true);
		else this.onClick.emit(true);
	}

}
