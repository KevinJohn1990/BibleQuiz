import { AngularFireAuth } from '@angular/fire/compat/auth';

import { Injectable } from '@angular/core';
// import { resolve } from 'url';
import { BehaviorSubject } from 'rxjs';
// import { Plugins } from '@capacitor/core';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import { JwtHelperService } from '@auth0/angular-jwt';

export interface IAuthInfo {
  isAuthenticated: boolean;
  gradesAuthenticated: number[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  public getLoggedInUserEmail(): string {
    let email = localStorage.getItem('email');
    if (email == null || email == '') {
      email = '';
    }
    return email;
  }

  public getAuthState() {
    return this.afAuth.authState;
  }
  private authSubs: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isAuthenticatedSubs() {
    return this.authSubs;
  }

  public isAuthenticated(): boolean {
    var tokenString;
    const token = localStorage.getItem('token');
    // console.log('Token:', token);
    // console.log('Token:', token == null);
    // Check whether the token is expired and return
    // true or false

    if (token == null || token == 'null' || token == '') {
      this.authSubs.next(false);
      return false;
    }
    this.authSubs.next(true);
    return true;
    // return !this.jwtHelper.isTokenExpired(token);
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth
        .createUserWithEmailAndPassword(value.email, value.password)
        .then(
          (res) => {
            resolve(res);
          },
          (err) => reject(err)
        );
    });
  }

  private _user;
  doLogin(value) {
    console.log('In service, value: ', value);
    return new Promise<any>((resolve, reject) => {
      var response;
      this.afAuth
        .signInWithEmailAndPassword(value.email, value.password)
        .then((res) => {
          response = res;
          return res.user.getIdToken();
        })
        .then((token) => {
          this._user = {
            email: response.user.email,
            token: token,
          };
          console.log('Token (login):', token);
          this.storeAuthData();
          resolve(response);
          this.authSubs.next(true);
        })
        .catch((err) => {
          reject(err);
          this.authSubs.next(false);
        });
    });
  }

  storeAuthData() {
    console.log('saving:', this._user);
    localStorage.setItem('email', this._user ? this._user.email : null);
    localStorage.setItem('email', this._user ? this._user.email : null);
    localStorage.setItem(
      'token',
      this._user && this._user.token ? this._user.token : null
    );
  }

  logout() {
    return new Promise<boolean>((resolve, reject) => {
      this.afAuth
        .signOut()
        .then(() => {
          this._user = null;
          this.storeAuthData();
          resolve(true);
          this.authSubs.next(false);
        })
        .catch((err) => reject(err));
    });
  }
}
