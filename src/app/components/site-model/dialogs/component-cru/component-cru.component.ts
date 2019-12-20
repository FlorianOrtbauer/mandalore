import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ISystem } from 'src/classes/interfaces/ISystem';
import { ApiService } from 'src/app/services/api-service.service';
import { IComponent } from 'src/classes/interfaces/IComponent';

@Component({
  selector: 'app-component-cru',
  templateUrl: './component-cru.component.html',
  styleUrls: ['./component-cru.component.scss']
})
export class ComponentCruComponent implements OnInit {

  component: IComponent; 
  originalComponent: IComponent; 

  isEdit: boolean; 
  isDelete: boolean;
  title: string; 
  @Input() system: ISystem; 
  
  constructor(private dialogRef: MatDialogRef<ComponentCruComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api:ApiService) { 
      console.log(data); 
    }

  ngOnInit() { 
    if(this.data.importedComponent)
    {
      this.title = "Edit component";
      this.component = this.data.importedComponent; 
      this.isEdit = true; 
    }
    else
    {
      this.title = "Add new component"; 
      this.component = {} as IComponent; 
      this.component.system_id = this.data.system_id; 
      this.isEdit = false; 
    }
      
  }

  cancel() {
    this.component = this.originalComponent;  
    console.log(this.component); 
    this.dialogRef.close();
  }

  save() {
    if(this.isEdit)
      this.api.editComponent(this.component); 
    else
      this.api.editComponent(this.component); 
    this.dialogRef.close();
  }
  
}