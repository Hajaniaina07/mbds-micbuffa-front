import {Component, Input, OnInit} from '@angular/core';
import {User} from "../user.model";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() user!: User;

  constructor() {
  }

  ngOnInit(): void {
  }

}
