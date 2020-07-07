import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) { }

  login(user: User) {
    return this.afa.auth.signInWithEmailAndPassword(user.email, user.senha);
  }

  cadastro(user: User) {
    return this.afa.auth.createUserWithEmailAndPassword(user.email, user.senha);
  }

  logout() {
    return this.afa.auth.signOut();
  }

  getAuth() {
    return this.afa.auth;
  }

}
