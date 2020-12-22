import { Component, Input, OnInit } from '@angular/core';
import { StoredUser } from '../../../../../interfaces';
import {AccountProvider, searchByName} from '../../../../../interfaces/AccountProvider/AccountProvider';


@Component({
	selector: 'app-login-user-card',
	templateUrl: './login-user-card.component.html',
	styleUrls: ['./login-user-card.component.scss']
})
export class LoginUserCardComponent implements OnInit {

	accountProviderList: AccountProvider[] = [
		{
			name: 'blocmaster',
			resources: {
				icon: {
					name: 'blocmaster-icon',
					src: 'https://www.flaticon.com/svg/static/icons/svg/61/61205.svg'
				}
			}
		},
		{
			name: 'google',
			resources: {
				icon: {
					name: 'google-icon',
					src: 'https://cdn.worldvectorlogo.com/logos/google-icon.svg'
				}
			}
		},
		{
			name: 'github',
			resources: {
				icon: {
					name: 'github-icon',
					src: 'https://www.flaticon.es/svg/static/icons/svg/25/25231.svg'
				}
			}
		}
	];

	private _selectedUser: StoredUser = null;
	selectedUserAccountProvider: AccountProvider = null;

	@Input() set selectedUser(selectedUser: StoredUser)  {
		this._selectedUser = selectedUser;
		this.selectedUserAccountProvider = searchByName(this.accountProviderList, selectedUser.data.providerId);
	}

	get selectedUser() {
		return this._selectedUser;
	}


	constructor() {}

	ngOnInit(): void {
	}

}
