import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../shared/users.service";
import {User} from "../user.model";
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from "../../shared/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user!: User;


  constructor(private userService: UsersService, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
    this.user = new User();
  }

  onSubmit() {
    console.log(this.user);
    this.userService.login(this.user).subscribe(response => {
      const body = response.body;
      window.localStorage.setItem('token', body.token);
      window.localStorage.setItem('user', JSON.stringify(body.user));
      this.router.navigate(['/accueuil']).then(() => {
        window.location.reload();
      });
    }, erreur => {
      let sb = this.snackBar.open(erreur.error.message, 'Fermer', {
        duration: 3500,
        panelClass: ["custom-style"]
      });
      sb.onAction().subscribe(() => {
        sb.dismiss();
      });
    });
  }
}
