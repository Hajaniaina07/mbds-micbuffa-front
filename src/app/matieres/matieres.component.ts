import {Component, OnInit} from '@angular/core';
import {Matiere} from "./matieres.model";
import {User} from "../users/user.model";
import {UsersService} from "../shared/users.service";
import {ImagePickerConf} from "ngp-image-picker";
import {MatieresService} from "../shared/matieres.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css']
})
export class MatieresComponent implements OnInit {
  matiere: Matiere = new Matiere();
  profs!: User[];

  matieres!: Matiere[];


  imagePickerConf: ImagePickerConf = {
    borderRadius: "4px",
    language: "fr",
    width: "100%",
    height: "100px"
  };
  selectedProf: any;
  showLoader: any;
  add = true;

  constructor(private userService: UsersService, private matiereService: MatieresService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userService.getUsersByProfile('prof').subscribe(response => {
      this.profs = response.users;
    });
    this.loadData();
  }

  onImageChange(event: string) {
    this.matiere.image = event;
  }

  saveMatieres() {
    if (this.selectedProf) {
      this.matiere.professeur = this.profs.find(prof => prof._id === this.selectedProf);
      delete this.matiere.professeur.password;
      this.matiereService.addMatieres(this.matiere).subscribe(response => {
        this.snackBar.open('Matière ajouté', 'Fermer', {duration: 3500});
        this.loadData();
        this.reset();
        this.showNewPanel(false);
      }, erreur => {
        this.snackBar.open(erreur.message, 'Fermer', {
          duration: 3500,
          panelClass: ["bg-danger"]
        })
      });
    }
  }

  private loadData() {
    this.showLoader = true;
    this.matiereService.getMatieres().subscribe(matieres => {
      this.matieres = matieres;
      this.showLoader = false;
    })
  }

  private reset() {
    this.matiere = new Matiere();
  }

  showNewPanel(b: boolean) {
    this.add = b;
  }
}
