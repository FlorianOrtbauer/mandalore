import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ISystem } from 'src/classes/interfaces/ISystem';
import { IArea } from 'src/classes/interfaces/IArea';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-component-cru',
  templateUrl: './component-cru.component.html',
  styleUrls: ['./component-cru.component.scss']
})
export class SystemCruComponent implements OnInit {

  system: ISystem; 
  originalSystem: ISystem; 

  isEdit: boolean; 
  title: string; 
  @Input() area: IArea; 
  
  constructor(private dialogRef: MatDialogRef<SystemCruComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api:ApiService) { 
      console.log(data); 
    }

  ngOnInit() { 
    if(this.data.importedSystem)
    {
      this.title = "Edit system";
      this.system = this.data.importedSystem; 
      this.isEdit = true; 
    }
    else
    {
      this.title = "Add new system"; 
      this.system = {} as ISystem; 
      this.system.area_id = this.data.area_id; 
      this.isEdit = false; 
    }
      
  }

  cancel() {
    this.system = this.originalSystem;  
    console.log(this.system); 
    this.dialogRef.close();
  }

  save() {
    if(this.isEdit)
      this.api.editSystem(this.system); 
    else
      this.api.addSystem(this.system); 
    this.dialogRef.close();
  }
  
}