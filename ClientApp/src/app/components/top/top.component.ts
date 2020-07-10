import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../shared/models';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
  @Input() userListings: User;

  constructor() { }

  ngOnInit() {
  }

}
