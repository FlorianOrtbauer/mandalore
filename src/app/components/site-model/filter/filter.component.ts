import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { IArea } from 'src/classes/interfaces/IArea';
import { SiteSelectionService } from 'src/app/services/site-selection.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  areas: IArea[];
  selectedArea: IArea; 
  selectedAreaId: string; 

  @Output() areaChanged = new EventEmitter<IArea>();

  selectedSiteId = 'no site selected';
  subscription: Subscription;

  constructor(private siteSelection:SiteSelectionService, private api:ApiService, ) {
    console.log("Consume site from site selection service")
    /*this.siteSelection.siteSelected$.subscribe (
      selectedSiteId => {
        this.selectedSiteId = selectedSiteId;
        console.log("consumed site from service " + this.selectedSiteId);
      });*/

    this.getSites();
  }

  getSites = () => {
    console.log("getAreasBy " + this.selectedSiteId);

    //this.api.getAreasBySite(this.selectedSiteId).subscribe (
      this.api.getAllAreas().subscribe (
      data => {
        this.areas = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  changeArea(){
    this.selectedArea = this.areas.find(element => element.id === this.selectedAreaId);
    this.areaChanged.emit(this.selectedArea); 
    console.log("Emitted selected Area: " + this.selectedArea.name);
  }

  ngOnInit() {
  }
}
