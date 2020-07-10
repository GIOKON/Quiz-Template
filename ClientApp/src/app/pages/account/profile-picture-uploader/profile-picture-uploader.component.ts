import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import PNotify from 'pnotify/dist/es/PNotify';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { PNotifyBottomRightStack } from '../../../config/PNotifySettings';
import { User } from '../../../shared/models';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-profile-picture-uploader',
  templateUrl: './profile-picture-uploader.component.html',
  styleUrls: ['./profile-picture-uploader.component.css']
})
export class ProfilePictureUploaderComponent implements OnInit {
  user = new User;
  serverUrl;

  constructor(private apiService: ApiService) {
    this.serverUrl = environment.apiUrl;
    this.apiService.getUser().subscribe((model: any) => {
      this.user = model;
    });
  }

  ngOnInit() {
  }

  onUpload(request) {
    let response = JSON.parse(request.response);
    this.user.profilePicture = response.items[0];
  }

}
