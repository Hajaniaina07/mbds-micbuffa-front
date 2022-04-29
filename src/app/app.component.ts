import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AssignmentsService} from './shared/assignments.service';
import {AuthService} from './shared/auth.service';
import {User} from "./users/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  titre = 'Application de gestion des assignments';
  isAuthenticated: any;
  user!: User;

  constructor(private authService: AuthService, private router: Router, private assignmentsService: AssignmentsService) {
    this.isAuthenticated = this.authService.loggedIn;
    this.user = this.authService.user;
  }

  genererDonneesDeTest() {
    //this.assignmentsService.peuplerBD();
    this.assignmentsService.peuplerBDAvecForkJoin().subscribe(() => {
      console.log(
        'TOUS LES AJOUTS ONT ETE FAITS, ON PEUT RE-AFFICHER LA LISTE'
      );
      // replaceUrl = true = force le refresh, même si
      // on est déjà sur la page d’accueil
      // Marche plus avec la dernière version d’angular
      this.router.navigate(['/accueuil'], {replaceUrl: true});
    });
  }

  navigateTo(url: string) {
    this.router.navigate([url], {replaceUrl: true}).then(() => {
    });
  }

  logout() {
    this.navigateTo('/accueuil')
    this.authService.logOut();
  }
}
