import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { ISystem } from 'src/classes/interfaces/ISystem';
import { IArea } from 'src/classes/interfaces/IArea';

@Component({
  selector: 'app-site-model',
  templateUrl: './site-model.component.html',
  styleUrls: ['./site-model.component.scss']
})
export class SiteModelComponent implements OnInit {
  sites = [];
  selectedArea: IArea; 
  selectedSystems: ISystem[]; 

  constructor(private api:ApiService) { }

  ngOnInit() {
  }

  changeArea(area){
    this.selectedArea = area; 
    this.selectedSystems = []; 
  }

  changeSystems(systems){
    this.selectedSystems = systems;  
  }

}
