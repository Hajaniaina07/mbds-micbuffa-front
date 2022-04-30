import {Component, OnInit} from '@angular/core';
import {Assignment} from '../assignment.model';
import {UsersService} from "../../shared/users.service";
import {MatieresService} from "../../shared/matieres.service";
import {AssignmentsService} from "../../shared/assignments.service";
import {User} from "../../users/user.model";
import {Matiere} from "../../matieres/matieres.model";
import {DropdownSettings} from "angular2-multiselect-dropdown/lib/multiselect.interface";
import {response} from "express";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  newAssignment: Assignment = new Assignment();
  isLinear = false;
  student!: User;
  students!: User[];
  matieres!: Matiere[];
  matiere!: Matiere;
  matieresList: any;
  selectedMatiere: any;
  studentList: any;
  selectedStudent: any;
  settings: DropdownSettings = {};
  loaderNew!: boolean;

  constructor(private userService: UsersService, private matiereService: MatieresService, private assignmentService: AssignmentsService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.newAssignment.nom = 'Test';
    this.newAssignment.dateDeRendu = new Date();
    this.loadStudent();
    this.loadMatiere();
    this.configure();
  }

  private loadStudent() {
    this.userService.getUsersByProfile('student').subscribe(students => {
      console.log(students);
      this.students = students.users;
      let items: any = [];
      if (this.students) {
        this.students.forEach(value => {
          items.push({
            id: value._id,
            itemName: value.name,
            name: value.name
          });
        });
        this.studentList = items;
      }
    });
  }

  private loadMatiere() {
    this.matiereService.getMatieres().subscribe(matieres => {
      this.matieres = matieres;
      let items: any = [];
      if (matieres)
        matieres.forEach(value => {
          items.push({
            id: value._id,
            itemName: value.nomMatiere,
            name: value.nomMatiere
          });
        });
      this.matieresList = items;
    })
  }

  onMatiereDeSelect($event: any) {
    this.newAssignment.matiere = undefined;
  }

  onMatiereSelect($event: any) {
    // @ts-ignore
    this.matiere = this.matieres.find(matiere => matiere._id === $event.id);
    this.newAssignment.matiere = this.matiere;
  }

  onStudentDeSelect($event: any) {
    this.newAssignment.auteur = undefined;
  }

  onStudentSelect($event: any) {
    // @ts-ignore
    this.student = this.students.find(student => student._id === $event.id);
    this.newAssignment.auteur = this.student;
  }

  configure() {
    this.settings = {
      enableSearchFilter: true,
      addNewItemOnFilter: false,
      singleSelection: true,
      clearAll: false,
      text: "Choisissez",
      tagToBody: true,
      searchPlaceholderText: 'Rechercher'
    };
  }

  save() {
    this.loaderNew = true;
    this.assignmentService.addAssignment(this.newAssignment).subscribe(response => {
      this.loaderNew = false;
      this.snackBar.open('Assignment ajouté', 'Fermer', {duration: 3500});
    });
  }
}

/*
  // Champ de formulaire
  nomAssignment!: string;
  dateDeRendu!: Date;

  constructor(private assignmentsService: AssignmentsService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if ((!this.nomAssignment) || (!this.dateDeRendu)) return;
    console.log(
      'nom = ' + this.nomAssignment + ' date de rendu = ' + this.dateDeRendu
    );

    let newAssignment = new Assignment();
    newAssignment.id = Math.round(Math.random() * 10000000);
    newAssignment.nom = this.nomAssignment;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;

    this.assignmentsService.addAssignment(newAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);

        // il va falloir naviguer (demander au router) d'afficher à nouveau la liste
        // en gros, demander de naviguer vers /home
        this.router.navigate(["/home"]);
      })
  }
}
*/
