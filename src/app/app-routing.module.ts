import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SiteModelComponent } from './components/site-model/site-model.component';
import { ClientConfigurationComponent } from './components/client-configuration/client-configuration.component';
import { SupplierConfigurationComponent } from './components/supplier-configuration/supplier-configuration.component';
import { LoginComponent } from './components/login/login.component';



const routes: Routes = [
  // main app routes
  { path: '', component: LoginComponent},
  { path: 'cmms', component: SidenavComponent},
  { path: '', component: SiteModelComponent, outlet:"content" },
  { path: 'site-model', component: SiteModelComponent, outlet:"content" },
  { path: 'client-configuration', component: ClientConfigurationComponent, outlet:"content" },
  { path: 'supplier-configuration', component: SupplierConfigurationComponent, outlet:"content" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
