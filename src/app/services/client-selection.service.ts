import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientSelectionService {

  // Observable string source
  private selectedClient: BehaviorSubject<string> = new BehaviorSubject<string>("undefined");
  site = this.selectedClient.asObservable(); 

  constructor(){
  }


  selectClient(selectedClientId: string){
    this.selectedClient.next(selectedClientId);
  }

}
