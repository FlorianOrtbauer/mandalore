import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IClient } from 'src/classes/interfaces/IClient';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-client-cru',
  templateUrl: './client-cru.component.html',
  styleUrls: ['./client-cru.component.scss']
})
export class ClientCruComponent implements OnInit {

  client: IClient; 
  originalClient: IClient; 

  isEdit: boolean; 
  title: string; 
  
  constructor(private dialogRef: MatDialogRef<ClientCruComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api:ApiService) { 
      console.log(data); 
    }

    ngOnInit() { 
    if(this.data.importedClient)
    {
      this.title = "Edit client";
      this.client = this.data.importedClient; 
      this.isEdit = true; 
    }
    else
    {
      this.title = "Add new client"; 
      this.client = {} as IClient; 
      this.isEdit = false; 
    }
      
  }

  cancel() {
    // this.site = this.originalSite;  
    // console.log(this.site); 
    this.dialogRef.close();
  }

  save() {
    if(this.isEdit)
      this.api.editClient(this.client); 
    else
      this.api.addClient(this.client); 
    this.dialogRef.close();
  }
  
}