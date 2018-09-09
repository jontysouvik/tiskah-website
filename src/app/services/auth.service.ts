import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userObservable: Observable<firebase.User>;
  public CONST_USER_COLLECTION_NAME = environment.userCollectionName;
  public tempUserFirstName = '';
  constructor(private _firebaseAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.userObservable = this._firebaseAuth.authState;
  }

  signUpUserWithEmailAndPassword(email: string, password: string) {
    return this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  sendVerificationEmail() {
    return this._firebaseAuth.auth.currentUser.sendEmailVerification();
  }
  updateUserProfile(displayName: string, photoUrl?: string) {
    return this._firebaseAuth.auth.currentUser.updateProfile({ displayName: displayName, photoURL: photoUrl });
  }
  signOut() {
    return this._firebaseAuth.auth.signOut();
  }
  signinWithEmailAndPassword(email: string, password: string) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }
  addNewUserData(user: User) {
    return this.afs.collection(this.CONST_USER_COLLECTION_NAME).doc(user.uid).set(JSON.parse(JSON.stringify(user)));
  }
  sendPasswordResetLink(email) {
    return this._firebaseAuth.auth.sendPasswordResetEmail(email);
  }
}
