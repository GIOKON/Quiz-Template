import { Component, Renderer2 } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { AuthService } from '../../shared/services';
import pageSettings from '../../config/page-settings';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class HomePage {
  pageSettings = pageSettings;
  endpoint: string;
  userListings: User;

  constructor(private api: ApiService, private auth: AuthService, private renderer: Renderer2,
    private router: Router, private route: ActivatedRoute) {
    this.endpoint = route.snapshot.params['id'];
    if (this.endpoint == null) {
      this.router.navigate(['/login']);
    }
    this.pageSettings.pageEmpty = true;
    this.renderer.addClass(document.body, 'bg-white');

    this.api.retrieveUserListings(this.endpoint).subscribe((model: any) => {
      this.userListings = model;
    });
  }






}
