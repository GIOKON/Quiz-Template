import { Component, OnInit, Renderer2} from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../shared/models';
import pageSettings from '../../config/page-settings';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  now = new Date();
  about;
  user = new User();

  constructor(private renderer: Renderer2) {
    pageSettings.pageEmpty = true;
    this.renderer.addClass(document.body, 'bg-white');

    this.user.name = 'GuestHostDirect';
    this.user.email = 'guesthostdirect@gmail.com';
    this.about = environment.motto;
  }

  ngOnInit() {
  }

}
