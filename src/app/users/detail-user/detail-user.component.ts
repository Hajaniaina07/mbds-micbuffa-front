import {Component, Input, OnInit} from '@angular/core';
import {User} from "../user.model";

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  @Input() user!: User;

  constructor() {
  }

  ngOnInit(): void {
  }

}
