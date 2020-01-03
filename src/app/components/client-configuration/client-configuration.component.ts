import { Component, OnInit } from '@angular/core';
import { IClient } from 'src/classes/interfaces/IClient';
import { ISite } from 'src/classes/interfaces/ISite';
import { IArea } from 'src/classes/interfaces/IArea';

@Component({
  selector: 'app-client-configuration',
  templateUrl: './client-configuration.component.html',
  styleUrls: ['./client-configuration.component.scss']
})
export class ClientConfigurationComponent implements OnInit {
  selectedClient: IClient;
  selectedSite: ISite;
  selectedArea: IArea;

  constructor() { }

  ngOnInit() {
  }

  changeClient(clients){
    this.selectedClient = clients[0];
  }

  changeSite(sites){
    this.selectedSite = sites[0];
  }

  changeArea(areas){
    this.selectedArea = areas[0];
  }


}
