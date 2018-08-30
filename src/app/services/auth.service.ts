import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userObservable: Observable<firebase.User>;
  constructor(private _firebaseAuth: AngularFireAuth) {
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
}
