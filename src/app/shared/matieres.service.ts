import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as hosts from "../../assets/url.json";
import {Matiere} from "../matieres/matieres.model";
import {User} from "../users/user.model";

@Injectable({
  providedIn: 'root'
})
export class MatieresService {

  url: any;

  constructor(private http: HttpClient) {
    const hsts = hosts;
    this.url = hsts.urlHost + '/matieres';
  }

  addMatieres(matiere: Matiere) {
    return this.http.post<Matiere>(this.url, matiere);
  }

  getMatieres() {
    return this.http.get<Matiere[]>(this.url);
  }
}
