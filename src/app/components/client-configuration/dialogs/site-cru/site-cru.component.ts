import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ISite } from 'src/classes/interfaces/ISite';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-site-cru',
  templateUrl: './site-cru.component.html',
  styleUrls: ['./site-cru.component.scss']
})
export class SiteCruComponent implements OnInit {

  site: ISite;  

  isEdit: boolean; 
  title: string; 
  
  constructor(private dialogRef: MatDialogRef<SiteCruComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private api:ApiService) { 
      console.log("Diaglog erstellt --> Übergebene Daten: ", data); 
  }

  ngOnInit() { 
    if(this.data.forwarededSite)
    {
      //Es wurde eine Site übergeben --> Edit
      this.title = "Edit - " + this.data.forwarededSite.name;
      this.site = this.data.forwarededSite; 
      this.isEdit = true; 
    }
    else
    {
      //Es wurde keine Site übergeben --> Neue Site
      this.title = "Add new site"; 
      this.site = {} as ISite; 
      this.site.client_id = this.data.client_id; 
      this.isEdit = false; 
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if(this.isEdit){
      this.api.editSite(this.site); 
    } else {
      this.api.addSite(this.site); 
    }
    this.dialogRef.close();
  }
  
}