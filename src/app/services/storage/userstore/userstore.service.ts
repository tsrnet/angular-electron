import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User, UserObject } from '../../../interfaces';

@Injectable({
	providedIn: 'root'
})
export class UserStoreService {

	constructor(private fs: AngularFirestore) {}

	public add(newUser: UserObject) {
		this.fs.collection('users').doc(newUser.userId).set(newUser).then(
			(value) => {
				console.log('Created!', value);
			},
			(reason) => {
				console.error('Error:', reason);
			});

		// return new Promise<any>((res, err) => {
		// 	this.fs.collection('users').doc(newUser.userId).set(newUser).then(res => { }, err => err(err));
		// });
	}

	public async getAll(): Promise<User[]> {
		let users: User[] = await new Promise((resolve, error) => {
			this.fs.collection('users').ref.get().then(
			(res) => {
				let users: User[] = [];
				if (!res.empty) {
					res.forEach(user => {
						users.push(User.New(user.data() as UserObject));
						// console.log(user.id, user.data())
					})
				} 
				resolve(users);
			},
			(err) => err(err));
		});
		return users;
		
		// await this.fs.collection('users').ref.get().then((snapshot) => {
		// 	if (!snapshot.empty) {
		// 		snapshot.forEach(user => {
		// 			console.log(user.id, user.data())
		// 		})
		// 	}
		// });
	}

	public getById(id: string) {
		this.fs.collection('users').doc(id).get().subscribe((snapshot) => {
			if (snapshot.exists) {
				console.log(snapshot.data);
			} else console.log(snapshot);
		});
	}

	public deleteById(id: string) {
		this.fs.collection('users').doc(id).delete().then((snapshot) => {
			console.log(snapshot);
		});
	}

}
