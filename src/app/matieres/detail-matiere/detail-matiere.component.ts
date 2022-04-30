import {Component, Input, OnInit} from '@angular/core';
import {Matiere} from "../matieres.model";

@Component({
  selector: 'app-detail-matiere',
  templateUrl: './detail-matiere.component.html',
  styleUrls: ['./detail-matiere.component.css']
})
export class DetailMatiereComponent implements OnInit {

  @Input() matiere!: Matiere;

  constructor() {
  }

  ngOnInit(): void {
  }

}
