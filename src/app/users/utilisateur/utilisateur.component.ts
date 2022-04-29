import {Component, OnInit} from '@angular/core';
import {ImagePickerConf} from "ngp-image-picker";
import {User} from "../user.model";
import {UsersService} from "../../shared/users.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ProgressComponent} from "../../base/progress/progress.component";
import {HttpEventType} from "@angular/common/http";

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

  user!: User;
  users!: User[];
  admins!: User[];
  profs!: User[];
  eleves!: User[];

  add: any;

  constructor(private userService: UsersService, private matDialog: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  onImageChange(target: string) {
    if (target) this.user.image = target;
  }

  submit() {
    const progress = this.matDialog.open(ProgressComponent, {
      width: '500px',
      height: '150px',
      data: {progress: 0}
    });
    this.userService.addUser(this.user).subscribe(response => {
      if (response.type === HttpEventType.UploadProgress) {
        if (response.total)
          progress.componentInstance.data.progress = Math.round(100 * response.loaded / response.total);
      } else if (response.type === HttpEventType.Response) {
        this.snackBar.open('La nouvelle matière a été insérée', 'Fermer', {duration: 3500});
        progress.close();
        this.loadData();
        this.reset();
      }
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
    this.userService.getUsers().subscribe(data => {
      this.users = data.users;
      if (this.users) {
        this.admins = this.users.filter(value => value.profile === 'admin');
        this.profs = this.users.filter(value => value.profile === 'prof');
        this.eleves = this.users.filter(value => value.profile === 'student');
      }
    });
  }
}
