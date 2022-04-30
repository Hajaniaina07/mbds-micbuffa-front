import {Component, OnInit} from '@angular/core';
import {Assignment} from '../assignment.model';
import {UsersService} from "../../shared/users.service";
import {MatieresService} from "../../shared/matieres.service";
import {AssignmentsService} from "../../shared/assignments.service";
import {User} from "../../users/user.model";
import {Matiere} from "../../matieres/matieres.model";

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  newAssignment: Assignment = new Assignment();
  isLinear = false;
  students!: User[];
  matieres!: Matiere[];
  matieresList: any;
  selectedMatiere: any;
  settings: any;

  constructor(private userService: UsersService, private matiereService: MatieresService, private assignmentService: AssignmentsService) {
  }

  ngOnInit() {
    this.loadStudent();
    this.loadMatiere();
    this.configure();
  }

  private loadStudent() {
    this.userService.getUsersByProfile('student').subscribe(response => {
      this.students = response.users;
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

  }

  onMatiereSelect($event: any) {

  }

  configure() {
    this.settings = {
      enableSearchFilter: true,
      addNewItemOnFilter: false,
      singleSelection: true,
      text: "",
      tagToBody: true,
      searchPlaceholderText: 'Rechercher'
    };
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
