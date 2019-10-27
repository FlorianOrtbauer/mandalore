import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-site-selector',
  templateUrl: './site-selector.component.html',
  styleUrls: ['./site-selector.component.scss']
})
export class SiteSelectorComponent implements OnInit {
  sites = [];
  
  constructor(private api:ApiService) {
    this.getSites();
  }

  ngOnInit() {
  }
  getSites = () => {
    this.api.getAllSites().subscribe (data => {
        this.sites = data;
        console.log("success"); 
        console.log(this.sites); 
      },
      error => {
        console.log(error);
      }
    )
  }

}
