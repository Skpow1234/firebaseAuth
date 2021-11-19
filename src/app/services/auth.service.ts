import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
//import {auth} from 'firebase/app';
//import { Auth } from '@firebase/auth';
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: any = null;
  
  constructor(private afu: AngularFireAuth, private router: Router) {
    // tslint:disable-next-line: no-shadowed-variable
      this.afu.authState.subscribe((auth => {
      this.authState = auth;
    }));
  }

  // all firebase getdata functions

  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false;
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : '';
  }

  get currentUserName(): string {
    return this.authState.email;
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true;
    } else {
      return false;
    }
  }

registerWithEmail(email: string, password: string) {
    return this.afu.createUserWithEmailAndPassword(email, password)
      .then (user=> {
        this.authState = user;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

loginWithEmail(email: string, password: string) {
    return this.afu.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.authState = user;
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }

signout(): void {
    this.afu.signOut();
    this.router.navigate(['/login']);
  }
  loginGoogle() {
    return  this.afu.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  loginFacebook() {
    return this.afu.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }
  loginGithub() {
    return this.afu.signInWithPopup(new firebase.auth.GithubAuthProvider());
  }
  loginTwitter() {
    return this.afu.signInWithPopup(new firebase.auth.TwitterAuthProvider());
  }
}
