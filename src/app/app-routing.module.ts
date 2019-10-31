import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SiteModelComponent } from './components/site-model/site-model.component';
import { LoginComponent } from './components/login/login.component';



const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'cmms', component: SidenavComponent},
  { path: 'site-model', component: SiteModelComponent, outlet:"content" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
