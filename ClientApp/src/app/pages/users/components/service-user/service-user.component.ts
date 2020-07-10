import { Component, OnInit } from '@angular/core';
import { CustomStoreService } from '../../../../shared/services/custom-store.service';
import { ApiService } from '../../../../shared/services/api.service';
import { RoleIds } from '../RoleIds';
import { User } from '../../../../shared/models';

@Component({
  selector: 'app-service-user',
  templateUrl: './service-user.component.html',
  styleUrls: ['./service-user.component.css']
})
export class ServiceUserComponent implements OnInit {
  serviceUserDataSource: any;
  roles: any;
  users: User[];

  constructor(private customStore: CustomStoreService, private api: ApiService) {
    this.serviceUserDataSource = this.customStore.createNewStore(RoleIds.Owner, '/api/Users');

  }

  ngOnInit() {
    this.roles = this.api.GetRoles().subscribe((response: any) => {
      this.roles = response.filter(item => item.name == 'Owner');
    });
    this.api.GetUsers().subscribe((response: any) => {
      this.users = response;
    });
  }

}
