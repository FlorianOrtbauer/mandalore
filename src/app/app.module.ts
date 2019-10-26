import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FormsModule} from '@angular/forms';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button'; 
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field'; 

import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NavElementComponent } from './components/sidenav/nav-element/nav-element.component';
import { NavHeadComponent } from './components/sidenav/nav-head/nav-head.component';
import { SiteModelComponent } from './components/site-model/site-model.component';
import { ComponentsComponent } from './components/site-model/components/components.component';
import { MissionsComponent } from './components/site-model/missions/missions.component';
import { FilterComponent } from './components/site-model/filter/filter.component';



@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    NavElementComponent,
    NavHeadComponent,
    SiteModelComponent,
    ComponentsComponent,
    MissionsComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatProgressBarModule,
    MatListModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
