import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api-service.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { SystemCruComponent } from '../dialogs/system-cru/system-cru.component';
import { IComponent } from 'src/classes/interfaces/IComponent';
import { IMission } from 'src/classes/interfaces/IMission';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {
  displayedColumns: string[] = ['component', 'name', 'priority', 'shortDesc'];
  dataSource: MatTableDataSource < IMission > ;
  selectedMission: IComponent[] = []; 
  missions: IMission[];

  @Input() selectedComponents: IComponent[];

  constructor(private api:ApiService) { }

  ngOnInit() {
  }

  // Prepared getMissionsByComponents
  getMissions(){
    this.api.getAllMissions()
    .subscribe (data => {
      this.missions = data;
    });
  }

}
