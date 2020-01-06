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

  isEdit: boolean; 
  title: string; 
  
  constructor(private dialogRef: MatDialogRef<SupplierCruComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api:ApiService) { 
      console.log(data); 
    }

    ngOnInit() { 
    //check if supplier to be updated was handed over from suppliers component, if so -> edit
    if(this.data.importedSupplier)
    {
      this.title = "Edit client";
      this.supplier = this.data.importedSupplier; 
    }
    // if no supplier was handed over -> create new
    else
    {
      this.title = "Add new client"; 
      this.supplier = {} as ISupplier; 
    }
      
  }

  // just close the dialog via a button
  cancel() {
    this.dialogRef.close();
  }

  //update or create based on call origin
  save() {
    //again check if supplier to be updated was handed over
    if(this.data.importedSupplier)
      this.api.editSupplier(this.supplier); 
    else
      this.api.addSupplier(this.supplier); 
    this.dialogRef.close();
  }

}
