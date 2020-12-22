import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
	providedIn: 'root'
})
export class FireStoreService {

	constructor(public fs: AngularFirestore) {
		let citiesRef = fs.collection('users').ref;
		let query = citiesRef.get()
			.then(snapshot => {
				if (snapshot.empty) {
					console.log('No matching documents.');
					return;
				}

				snapshot.forEach(doc => {
					console.log(doc.id, '=>', doc.data());
				});
			})

		
		
			// let doc = fs.collection('users').doc('1001').ref;
		// let observer = doc.onSnapshot(docSnapshot => {
		// 	console.log('Received doc snapshot:', docSnapshot.data());
		// 	// ...
		// }, err => {
		// 	console.log(`Encountered error: ${err}`);
		// });




		// let query = citiesRef.where('capital', '==', true).get()
		// 	.then(snapshot => {
		// 		if (snapshot.empty) {
		// 			console.log('No matching documents.');
		// 			return;
		// 		}

		// 		snapshot.forEach(doc => {
		// 			console.log(doc.id, '=>', doc.data());
		// 		});
		// 	})
	}


	public addToCollection(collectionName: string, id: string, data: any) {
		return new Promise<any>((res, err) => {
			this.fs.collection(collectionName).doc(id).set(data).then(res => { }, err => err(err));
		});
	}
}
