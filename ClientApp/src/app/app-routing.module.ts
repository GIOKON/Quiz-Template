import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Home
import { HomePage } from './pages/home/home';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { AdminGuard, AuthGuard, OwnerGuard } from './shared/guards/index';
import { RegisterComponent } from './pages/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin-panel', pathMatch: 'full' },
  { path: 'admin-panel', component: AdminPanelComponent, data: { title: 'Admin Panel'}, canActivate: [OwnerGuard]  },
  { path: 'account', component: AccountComponent, data: { title: 'Account'}, canActivate: [OwnerGuard]  },
  { path: 'users-table', component: UsersComponent, data: { title: 'Users'}, canActivate: [AdminGuard]  },
  { path: 'login', component: LoginComponent, data: { title: 'Login'} },
  { path: 'register', component: RegisterComponent, data: { title: 'Register'} },
  { path: 'register/:referrer', component: RegisterComponent, data: { title: 'Register'} },
  { path: 'not-found', component: NotFoundComponent, data: { title: 'Not Found'} },
  { path: 'about', component: AboutComponent, data: { title: 'About Us'} },
  { path: ':id', component: HomePage, data: { title: 'Home'} },
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [ CommonModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})


export class AppRoutingModule { }
