import { Component, OnInit } from '@angular/core';
import { CustomStoreService } from '../../../../shared/services/custom-store.service';
import { RoleIds } from '../RoleIds';
import { ApiService } from '../../../../shared/services/api.service';

@Component({
  selector: 'app-super-admin-table',
  templateUrl: './super-admin-table.component.html',
  styleUrls: ['./super-admin-table.component.css']
})
export class SuperAdminTableComponent implements OnInit {
  userDatasource: any;
  roles: any;

  constructor(private customStore: CustomStoreService, private api: ApiService) {
    this.userDatasource = this.customStore.createNewStore(RoleIds.SuperAdmin, '/api/Users');
  }

  ngOnInit() {
    this.roles = this.api.GetRoles().subscribe((response: any) => {
      this.roles = response;
    });
  }

}
