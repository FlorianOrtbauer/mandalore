import { Component, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { IClient } from 'src/classes/interfaces/IClient';
import { ClientSelectionService } from 'src/app/services/client-selection.service';

@Component({
  selector: 'app-client-selector',
  templateUrl: './client-selector.component.html',
  styleUrls: ['./client-selector.component.scss']
})
export class ClientSelectorComponent implements OnInit, OnChanges {
  
  clients: IClient[];
  selectedClient: IClient;
  selectedClientId: string;
  
  // @Input....
  @Output() clientChanged = new EventEmitter<IClient>();

  constructor(private api:ApiService, private clientSelection:ClientSelectionService) {
    this.getClients();
  }

  

  ngOnInit() {
  }

  ngOnChanges() {
    this.getClients(); 
  }

  getClients = () => {
    this.api.getAllClients().subscribe (data => {
        this.clients = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  changeClient(){
    console.log("Change Client");
    this.selectedClient = this.clients.find(element => element.id === this.selectedClientId);
    this.clientSelection.selectClient(this.selectedClientId);
    console.log("selected Client: >>" + this.selectedClient.name + "<< via site selection service");
    this.clientChanged.emit(this.selectedClient);
  }

}
