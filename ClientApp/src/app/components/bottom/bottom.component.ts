import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../shared/models';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-bottom',
  templateUrl: './bottom.component.html',
  styleUrls: ['./bottom.component.css']
})
export class BottomComponent implements OnInit {
  @Input() user: User;
  @Input() dontShow = false;
  now = new Date();
  about;

  constructor() {
    this.about = environment.motto;
  }

  ngOnInit() {
  }

}
