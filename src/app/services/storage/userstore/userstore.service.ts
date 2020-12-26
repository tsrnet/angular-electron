import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User, UserObject } from '../../../interfaces';

@Injectable({
	providedIn: 'root'
})
export class UserStoreService {

	constructor(private fs: AngularFirestore) {}

	public add(newUser: UserObject) {
		this.fs.collection('users').doc(''+newUser.userId).set(newUser).then(
			(value) => {
				console.log('Created!', value);
			},
			(reason) => {
				console.error('Error:', reason);
			});
	}

	public getAll() {
		return new Promise<User[]>((resolve, error) => {
			this.fs.collection('users').ref.get().then((snapshot) => {
				let users: User[] = [];
				snapshot.docs.forEach(((user) => users.push(User.New(user.data() as UserObject))))
				resolve(users);
			}).catch((reason) => error(reason));
		})
	}

	public getById(id: string) {
		return new Promise<User>((resolve, error) => {
			this.fs.collection('users').ref.doc(id).get().then((snapshot) => {
				let user: User = (!snapshot.exists) ? null : User.New((snapshot.data() as UserObject));
				resolve(user);
			}).catch((reason) => error(reason));
		})
	}

	public getByEmail(email: string) {
		return new Promise<User>((resolve, error) => {
			this.fs.collection('users').ref.where('email', '==', email).get().then((snapshot) => {
				let user: User = (snapshot.empty) ? null : User.New((snapshot.docs[0].data() as UserObject));
				resolve(user);
			}).catch((reason) => error(reason));
		})
	}

	public deleteById(id: string) {
		return new Promise<boolean>((resolve, error) => {
			this.fs.collection('users').ref.doc(id).delete().then((snapshot) => {
				console.log(snapshot);
			}).catch((reason) => {
				console.log(reason);
			});
		})
	}

}
