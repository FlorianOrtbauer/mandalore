import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api-service.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ISupplier } from 'src/classes/interfaces/ISupplier';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { SupplierCruComponent} from '../dialogs/supplier-cru/supplier-cru.component';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'address1', 'address2', 'address3', 'address4', 'edit'];
  dataSource: MatTableDataSource < ISupplier > = new MatTableDataSource([]);
  selection = new SelectionModel<ISupplier>(false, [], );

  @Output() suppliersChanged = new EventEmitter<ISupplier[]>();

  constructor(private api:ApiService, private dialog:MatDialog) { 
    this.selection.changed.subscribe((change) => this.changeSelectedSuppliers()) ;
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.getSuppliers();
    this.dataSource.sort = this.sort;
  }


/**************************************************************
 * 
 *  Table Element Selection Logic (pink flag)
 * 
 *************************************************************/

  toggleSelection($event, row)
  {
    if($event.target.tagName === "I")
      return; 
    this.selection.toggle(row); 
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if(this.isAllSelected())
    {
      this.selection.clear(); 
    } 
    else
    {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
        
  }

  checkboxLabel(row?: ISupplier): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
  }

  changeSelectedSuppliers() {
    this.suppliersChanged.emit(this.selection.selected);
  }
  /* End table element selection logic */


/**************************************************************
 * 
 *  Data retrieval and modification logic
 * 
 *************************************************************/
  
  // Search box filter
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // get all suppliers and fetch to table data source
  getSuppliers() {
    console.log("Get all Suppliers");
    this.api.getAllSuppliers()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);  
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log("supplier retrieval error");
        console.log(error);
      }
    );
  }

  // delete checkbox selected suppliers
  deleteSuppliers()
  {
    if(this.selection.selected.length === 0)
    {
      alert("Please select a supplier");
      return;
    }
      
    if(confirm("Are you sure to delete " + this.selection.selected.length + " selected systems?")) {
      this.api.deleteSuppliers(this.selection.selected);
      setTimeout(() => this.getSuppliers(),1000);
    }
  }

  // add a new supplier via supplier-cru component
  openAddSupplierDialog() 
  {
    const dialogConfig = new MatDialogConfig();

    //allow esc button closure
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    //important to handover empty object -- 3h of life wasted on finding that one...
    //nothing really breaks but input form does not really work in case not handed over.
    dialogConfig.data = {};

    this.dialog.open(SupplierCruComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
      setTimeout(() => this.getSuppliers(),1000);
    });
  }

  //edit an existing supplier
  openEditSupplierDialog(supplier)
  {
    
    const dialogConfig = new MatDialogConfig();

    // dont allow esc button closure
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    //hand over supplier to be updated
    dialogConfig.data = {importedSupplier: supplier};

    //open dialog
    this.dialog.open(SupplierCruComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
      setTimeout(() => this.getSuppliers(),1000);
    }); 
  }
  /* end data retrieval and modification logic */

}
