import { Component, Input, Output, EventEmitter, Renderer2, OnDestroy } from '@angular/core';
import pageSettings from '../../config/page-settings';
import { AuthService } from '../../shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy {
  @Input() pageSidebarTwo;
	@Output() toggleSidebarRightCollapsed = new EventEmitter<boolean>();
	@Output() toggleMobileSidebar = new EventEmitter<boolean>();
	@Output() toggleMobileRightSidebar = new EventEmitter<boolean>();
  pageSettings = pageSettings;
  username: string;
  isLoggedIn = false;

  mobileSidebarToggle() {
		this.toggleMobileSidebar.emit(true);
  }
  mobileRightSidebarToggle() {
		this.toggleMobileRightSidebar.emit(true);
  }
	toggleSidebarRight() {
		this.toggleSidebarRightCollapsed.emit(true);
	}

	mobileTopMenuToggle() {
	  this.pageSettings.pageMobileTopMenuToggled = !this.pageSettings.pageMobileTopMenuToggled;
	}

	mobileMegaMenuToggle() {
	  this.pageSettings.pageMobileMegaMenuToggled = !this.pageSettings.pageMobileMegaMenuToggled;
	}

	ngOnDestroy() {
	  this.pageSettings.pageMobileTopMenuToggled = false;
	  this.pageSettings.pageMobileMegaMenuToggled = false;
	}

  constructor(private renderer: Renderer2, private auth: AuthService, private router: Router) {
      this.username = auth.getUsername();
      this.isLoggedIn = auth.getUsername() != null;
  }

  logout() {
    this.auth.logout(true);
    this.router.navigate(['/login']);
  }
}
