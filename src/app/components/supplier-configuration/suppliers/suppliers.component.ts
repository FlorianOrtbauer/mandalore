import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api-service.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
//import { SystemCruComponent } from '../dialogs/system-cru/system-cru.component';
import { ISupplier } from 'src/classes/interfaces/ISupplier';
import { SelectionModel } from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'address1', 'address2', 'address3', 'address4'];
  dataSource: MatTableDataSource < ISupplier > = new MatTableDataSource([]);
  selection = new SelectionModel<ISupplier>(false, [], );

  @Output() systemsChanged = new EventEmitter<ISupplier[]>();

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
 *  Element Selection Logic
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
// End element selection logic

/**************************************************************
 * 
 *  Data retrieval and modification logic
 * 
 *************************************************************/

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

  changeSelectedSuppliers() {
    this.systemsChanged.emit(this.selection.selected);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

//end data retrieval and modification logic


}
