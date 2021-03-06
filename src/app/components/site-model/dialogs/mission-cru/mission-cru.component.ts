import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IComponent } from 'src/classes/interfaces/IComponent';
import { ApiService } from 'src/app/services/api-service.service';
import { IMission } from 'src/classes/interfaces/IMission';

@Component({
  selector: 'app-mission-cru',
  templateUrl: './mission-cru.component.html',
  styleUrls: ['./mission-cru.component.scss']
})
export class MissionCruComponent implements OnInit {

  mission: IMission;
  originalMission: IMission;

  isEdit: boolean;
  isDelete: boolean;
  title: string;
  @Input() system: IComponent;

  constructor(private dialogRef: MatDialogRef<MissionCruComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private api:ApiService) {
    console.log(data);
  }

  ngOnInit() {
    if(this.data.importedMission)
    {
      this.title = "Edit mission";
      this.mission = this.data.importedMission;
      this.isEdit = true;
    }
    else
    {
      this.title = "Add new mission";
      this.mission = {} as IMission;
      this.mission.component_id = this.data.component_id;
      this.isEdit = false;
    }

  }

  cancel() {
    this.mission = this.originalMission;
    console.log(this.mission);
    this.dialogRef.close();
  }

  save() {
    if(this.isEdit)
      this.api.editMission(this.mission);
    else
      this.api.addMission(this.mission);
      this.dialogRef.close();
  }

}
