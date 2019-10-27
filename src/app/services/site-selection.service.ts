import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteSelectionService {

  // Observable string source
  private siteSelectionSource = new Subject<string>();

  // Observable string stream
  siteSelected$ = this.siteSelectionSource.asObservable();

  selectSite(selectedSiteId: string){
    this.siteSelectionSource.next(selectedSiteId);
    console.log("sucessfully received site "+ selectedSiteId + " in site selection service");
  }

}
