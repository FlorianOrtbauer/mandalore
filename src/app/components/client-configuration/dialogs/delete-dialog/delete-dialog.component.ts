import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ISite } from 'src/classes/interfaces/ISite';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-celete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  title: string; 
  contentText: string;

  constructor(private dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private api:ApiService) { 
      console.log("Delete-Digalog erstellt --> Übergebene Daten: ", data); 
  }

  ngOnInit() { 
    if(this.data.deleteType==="site")
    {
      //Es wurde eine Site übergeben --> Edit
      this.title = "Delete - " + this.data.forwardedObject.name;
      this.contentText = "Are you sure to delete the site " + this.data.forwardedObject.name + "?";
    }
    //Lasse die Möglichkeit auch andere "Objekte" als sites zu löschen
    //Dann müsste nur die ensprechende if-Bedingung hier eingefügt werden

  }

  clickNo() {
    this.dialogRef.close();
  }

  clickYes() {
    if(this.data.deleteType==="site"){
      this.api.deleteSite(this.data.forwardedObject);
      setTimeout(() => this.dialogRef.close(),500);
    }
    //Lasse Möglichkeit auch andere Objekte zu löschen
  }
  
}