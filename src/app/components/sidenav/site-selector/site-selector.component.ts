import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { ISite } from 'src/classes/interfaces/ISite';
import { SiteSelectionService } from 'src/app/services/site-selection.service';

@Component({
  selector: 'app-site-selector',
  templateUrl: './site-selector.component.html',
  styleUrls: ['./site-selector.component.scss']
})
export class SiteSelectorComponent implements OnInit {
  sites: ISite[];
  selectedSite: ISite;
  selectedSiteId: string;
  
  @Output() siteChanged = new EventEmitter<ISite>();

  constructor(private api:ApiService, private siteSelection:SiteSelectionService) {
    this.getSites();
  }

  ngOnInit() {
  }

  getSites = () => {
    this.api.getAllSites().subscribe (data => {
        this.sites = data;
        console.log("site-selector getSites success"); 
      },
      error => {
        console.log(error);
      }
    )
  }

  changeSite(){
    console.log("Change Site!");
    this.selectedSite = this.sites.find(element => element.id === this.selectedSiteId);
    this.siteSelection.selectSite(this.selectedSiteId);
    console.log("selected Site: >>" + this.selectedSite.name + "<< via site selection service");
  }

}
