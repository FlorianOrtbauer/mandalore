import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteModelComponent } from './components/site-model/site-model.component';


const routes: Routes = [
  { path: 'site-model', component: SiteModelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
