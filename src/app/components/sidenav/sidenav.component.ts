import { Component, OnInit } from '@angular/core';
import { IClient } from 'src/classes/interfaces/IClient';
import { ISite } from 'src/classes/interfaces/ISite';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent{
  selectedClient: IClient;
  selectedSite: ISite;

  constructor() { }

  ngOnInit() {
  }

  changeClient(clients){
    this.selectedClient = clients;
    console.log("CHANGE:", this.selectedClient);
  }

  changeSite(sites){
    this.selectedSite = sites[0];
  }

}
