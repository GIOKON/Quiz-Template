import { Component, OnInit, OnDestroy } from '@angular/core';
import pageSettings from '../../config/page-settings';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnDestroy {
  pageSettings = pageSettings;

  constructor() {
    this.pageSettings.pageEmpty = true;
  }

  ngOnDestroy() {
    this.pageSettings.pageEmpty = false;
  }
}
