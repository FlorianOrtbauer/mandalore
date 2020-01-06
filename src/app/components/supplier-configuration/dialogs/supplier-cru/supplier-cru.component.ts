import { Component, OnInit, Inject } from '@angular/core';
import { ISupplier } from 'src/classes/interfaces/ISupplier';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-supplier-cru',
  templateUrl: './supplier-cru.component.html',
  styleUrls: ['./supplier-cru.component.scss']
})
export class SupplierCruComponent implements OnInit {
  
  supplier: ISupplier; 
  originalSupplier: ISupplier; 

  isEdit: boolean; 
  title: string; 
  
  constructor(private dialogRef: MatDialogRef<SupplierCruComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api:ApiService) { 
      console.log(data); 
    }

    ngOnInit() { 
    if(this.data.importedSupplier)
    {
      this.title = "Edit client";
      this.supplier = this.data.importedSupplier; 
      this.isEdit = true; 
    }
    else
    {
      this.title = "Add new client"; 
      this.supplier = {} as ISupplier; 
      this.isEdit = false; 
    }
      
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if(this.isEdit)
      this.api.editSupplier(this.supplier); 
    else
      this.api.addSupplier(this.supplier); 
    this.dialogRef.close();
  }

}
