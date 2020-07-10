import { Component, OnInit } from '@angular/core';
import { CustomStoreService } from '../../../../shared/services/custom-store.service';
import { RoleIds } from '../RoleIds';
import { ApiService } from '../../../../shared/services/api.service';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.css']
})
export class AdminTableComponent implements OnInit {
  dataSource: any;
  roles: any;

  constructor(private customStore: CustomStoreService, private api: ApiService) {
    this.dataSource = this.customStore.createNewStore(RoleIds.Admin, '/api/Users');
  }

  ngOnInit() {
    this.roles = this.api.GetRoles().subscribe((response: any) => {
      this.roles = response;
    });
  }

}
