import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IClient } from 'src/classes/interfaces/IClient';
import { ISite } from 'src/classes/interfaces/ISite';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-site-cru',
  templateUrl: './site-cru.component.html',
  styleUrls: ['./site-cru.component.scss']
})
export class SiteCruComponent implements OnInit {

  site: ISite; 
  originalSite: ISite; 

  isEdit: boolean; 
  title: string; 

  @Input() client: IClient; 
  
  constructor(private dialogRef: MatDialogRef<SiteCruComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api:ApiService) { 
      console.log(data); 
    }

  ngOnInit() { 
    if(this.data.importedSite)
    {
      this.title = "Edit site";
      this.site = this.data.importedSite; 
      this.isEdit = true; 
    }
    else
    {
      this.title = "Add new site"; 
      this.site = {} as ISite; 
      this.site.client_id = this.data.client_id; 
      this.isEdit = false; 
    }
      
  }

  cancel() {
    this.site = this.originalSite;  
    console.log(this.site); 
    this.dialogRef.close();
  }

  save() {
    if(this.isEdit)
      this.api.editSite(this.site); 
    else
      this.api.addSite(this.site); 
    this.dialogRef.close();
  }
  
}