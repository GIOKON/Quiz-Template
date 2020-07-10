import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { User } from '../../shared/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  user: User;

  constructor(private api: ApiService, private router: Router) {
    this.api.getUser().subscribe((model: any) => {
      this.user = model;
    });
  }



  ngOnInit() {
  }

}
