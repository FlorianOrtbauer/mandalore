import { Component, OnInit, EventEmitter, Output, OnChanges, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { ISite } from 'src/classes/interfaces/ISite';
import { SiteSelectionService } from 'src/app/services/site-selection.service';
import { IClient } from 'src/classes/interfaces/IClient';

@Component({
  selector: 'app-site-selector',
  templateUrl: './site-selector.component.html',
  styleUrls: ['./site-selector.component.scss']
})
export class SiteSelectorComponent implements OnInit, OnChanges {
  
  sites: ISite[];
  selectedSite: ISite;
  selectedSiteId: string;
  
  @Input() selectedClient: IClient; 
  @Output() siteChanged = new EventEmitter<ISite>();

  constructor(private api:ApiService, private siteSelection:SiteSelectionService) {
    this.getSites();
  }

  

  ngOnInit() {
  }

  ngOnChanges() {
    this.getSites(); 
  }

  getSites = () => {
    if (!this.selectedClient){
      console.log("no Client selected");
      this.sites = [];
      return
    }

    this.api.getSitesByClient(this.selectedClient.id)
    .subscribe (data => {
        this.sites = data;
        console.log("site-selector getSites success"); 
      },
      error => {
        this.sites=[];
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
