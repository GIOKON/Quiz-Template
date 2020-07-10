import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  tabs: any;
  isSuperAdmin: boolean;


  constructor(private auth: AuthService) {
    this.isSuperAdmin = auth.getIsSuperAdmin();

      this.tabs = [
        { id: 1, title: 'Owners', template: 'template1' },
        { id: 2, title: 'Admins', template: 'template2' },
        // { id: 3, title: 'SuperAdmins', template: 'template3' },
      ];
   }

  ngOnInit() {
  }

}
