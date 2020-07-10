import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-background-picture-uploader',
  templateUrl: './background-picture-uploader.component.html',
  styleUrls: ['./background-picture-uploader.component.css']
})
export class BackgroundPictureUploaderComponent implements OnInit {
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
    this.user.backgroundPicture = response.items[0];
  }

}
