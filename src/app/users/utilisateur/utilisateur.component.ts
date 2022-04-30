import {Component, OnInit} from '@angular/core';
import {ImagePickerConf} from "ngp-image-picker";
import {User} from "../user.model";
import {UsersService} from "../../shared/users.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  imagePickerConf: ImagePickerConf = {
    borderRadius: "4px",
    language: "fr",
    width: "320px",
    height: "240px",
  };

  user: User = new User();
  users!: User[];
  admins!: User[];
  profs!: User[];
  eleves!: User[];

  defaultUserImage = 'data:image/webp;base64,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';

  add = true;
  showLoader: any;

  constructor(private userService: UsersService, private matDialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  onImageChange(target: string) {
    if (target) this.user.image = target;
  }

  submit() {
    if (!this.user.image) this.user.image = this.defaultUserImage;
    this.userService.addUser(this.user).subscribe(response => {
      this.snackBar.open('Utilisateur ajouté', 'Fermer', {duration: 3500});
      this.loadData();
      this.reset();
      this.showNewPanel(false);
    }, erreur => {
      this.snackBar.open(erreur.message, 'Fermer', {
        duration: 3500,
        panelClass: ["custom-style"]
      })
    });
  }

  reset() {
    this.user = new User();
  }

  showNewPanel(state: boolean) {
    if (state) this.reset();
    this.add = state;
  }

  private loadData() {
    this.showLoader = true;
    this.userService.getUsers().subscribe(data => {
      this.users = data.users;
      if (this.users) {
        this.admins = this.users.filter(value => value.profile === 'admin');
        this.profs = this.users.filter(value => value.profile === 'prof');
        this.eleves = this.users.filter(value => value.profile === 'student');
      }
      this.showLoader = false;
    });
  }
}
