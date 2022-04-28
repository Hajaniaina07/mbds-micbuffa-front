import {Injectable} from '@angular/core';
import {User} from "../users/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = localStorage.getItem('token');
  loggedIn = !!this.token;
  user = JSON.parse(<string>localStorage.getItem('user')) as User;

  logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  }

  isAdmin() {
    let isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.user.profile === 'admin');
    });
    //return this.loggedIn;
    return isUserAdmin;
  }

  // isAdmin().then(admin => { if(admin) { console.log("L'utilisateur est administrateur"); }})

  constructor() {
  }
}
