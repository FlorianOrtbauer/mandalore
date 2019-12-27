import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { ISystem } from 'src/classes/interfaces/ISystem';
import { IArea } from 'src/classes/interfaces/IArea';
import { IComponent } from 'src/classes/interfaces/IComponent';
import {IMission} from '../../../classes/interfaces/IMission';
import {ITask} from '../../../classes/interfaces/ITask';

@Component({
  selector: 'app-site-model',
  templateUrl: './site-model.component.html',
  styleUrls: ['./site-model.component.scss']
})
export class SiteModelComponent implements OnInit {
  sites = [];
  selectedArea: IArea;
  selectedSystem: ISystem;
  selectedComponent: IComponent;
  selectedMission: IMission;
  selectedTask: ITask;

  constructor(private api:ApiService) { }

  ngOnInit() {
  }

  changeArea(area){
    this.selectedArea = area;
    this.selectedSystem = null;
  }

  changeSystem(systems){
    this.selectedSystem = systems[0];
  }

  changeComponent(components){
    this.selectedComponent = components[0];
    console.log("component changed in sitemodel: " + this.selectedComponent);
  }

  changeMission(missions){
    this.selectedMission = missions[0];
  }

  changeTask(tasks){
    this.selectedTask = tasks[0];
  }

}
