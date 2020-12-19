import { Component, Input, OnInit, Output } from '@angular/core';
import { StoredUser } from '../../../../../interfaces';
import { ElectronService } from '../../../../../services';

@Component({
	selector: 'app-login-select',
	templateUrl: './login-select.component.html',
	styleUrls: ['./login-select.component.scss']
})

export class LoginSelectComponent {

	@Output('value') selectedUser: StoredUser = null;
	@Input('collection') storedUsers: StoredUser[];

	//select functionality
	public isOpen: boolean = true;

	constructor(public electron: ElectronService) { }

	ngOnInit(): void {

	}

	public onClick() {
		this.isOpen = !this.isOpen;
	}

}
