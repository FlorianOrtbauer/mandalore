import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ISystem } from 'src/classes/interfaces/ISystem';
import { IArea } from 'src/classes/interfaces/IArea';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-system-cru',
  templateUrl: './system-cru.component.html',
  styleUrls: ['./system-cru.component.scss']
})
export class SystemCruComponent implements OnInit {

  system: ISystem; 
  isEdit: boolean; 
  title: string; 
  @Input() area: IArea; 
  
  constructor(private dialogRef: MatDialogRef<SystemCruComponent>,
    @Inject(MAT_DIALOG_DATA) public importedSystem: ISystem,
    private api:ApiService) { }

  ngOnInit() {
    if(this.importedSystem)
    {
      this.title = "Edit system";
      this.system = this.importedSystem; 
      this.isEdit = true; 
    }
    else
    {
      this.title = "Add new system"; 
      this.system = {} as ISystem; 
      this.isEdit = false; 
    }
      
  }

  cancel() {
    console.log(this.system); 

    // this.dialogRef.close();
  }

  save() {
    if(this.isEdit)
      this.api.editSystem(this.system); 
    else
      this.api.addSystem(this.system); 
    this.dialogRef.close();
  }


}
