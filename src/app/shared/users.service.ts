import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as hosts from "../../assets/url.json";
import {User} from "../users/user.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [];
  url: any;

  constructor(private http: HttpClient) {
    const hsts = hosts;
    this.url = hsts.urlHost + '/users';
  }

  login(user: User): Observable<any> {
    return this.http.post<User>(this.url + '/login', user, {observe: 'response'});
  }

  addUser(user: User) {
    return this.http.post<User>(this.url, user, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getUsers() {
    return this.http.get<any>(this.url);
  }

  getUsersByProfile(profile: string) {
    return this.http.get<any>(this.url + '/' + profile
    );
  }
}
