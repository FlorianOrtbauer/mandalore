import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteSelectionService {

  // Observable string source
  private selectedSite: BehaviorSubject<string> = new BehaviorSubject<string>("undefined");
  site = this.selectedSite.asObservable(); 

  constructor(){
  }


  selectSite(selectedSiteId: string){
    this.selectedSite.next(selectedSiteId);
  }

}
