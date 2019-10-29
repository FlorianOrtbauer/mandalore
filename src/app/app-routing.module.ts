import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SiteModelComponent } from './components/site-model/site-model.component';



const routes: Routes = [
  
  { path: 'site-model', component: SiteModelComponent, outlet:"content" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
