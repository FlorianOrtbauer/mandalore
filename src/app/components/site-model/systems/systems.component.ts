import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api-service.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { SystemCruComponent } from '../dialogs/system-cru/system-cru.component';
import { ISystem } from 'src/classes/interfaces/ISystem';
import { IArea } from 'src/classes/interfaces/IArea';
import { SelectionModel } from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-systems',
  templateUrl: './systems.component.html',
  styleUrls: ['./systems.component.scss']
})
export class SystemsComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'priority', 'edit'];
  dataSource: MatTableDataSource < ISystem > = new MatTableDataSource([]);
  selection = new SelectionModel<ISystem>(true, [], );

  @Input() selectedArea: IArea; 
  @Output() systemsChanged = new EventEmitter<ISystem[]>();

  constructor(private api:ApiService, private dialog:MatDialog) {
    this.selection.changed.subscribe((change) => this.changeSelectedSystems()) ;
  }
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  getSystems() {
      console.log("Get Systems for "+this.selectedArea)
      this.api.getSystemsByArea(this.selectedArea.id)
        .subscribe(data => {
          data.forEach(element => {element.area = this.selectedArea;});
          this.dataSource = new MatTableDataSource(data);  
          this.dataSource.sort = this.sort;
        },
        error => {
          console.log(error);
        }
      );
    
  }

  changeSelectedSystems() {
    this.systemsChanged.emit(this.selection.selected);
  }

  delete()
  {
    if(this.selection.selected.length === 0)
    {
      alert("No systems selected!");
      return;
    }
      
    if(confirm("Are you sure to delete the selected systems?")) {
      this.api.deleteSystems(this.selection.selected);
      setTimeout(() => this.getSystems(),1000);
    }
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  toggleSelection($event, row)
  {
    if($event.target.tagName === "I")
      return; 
    this.selection.toggle(row); 
  }

  ngOnChanges() {
    if(this.selectedArea == null)
      return; 
    this.selection.clear();
    this.getSystems(); 
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  checkboxLabel(row?: ISystem): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
  }

  
  openAddDialog() {

    if(this.selectedArea == null)
    {
      alert("No area selected!"); 
      return; 
    }
      
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data =  {'area_id': this.selectedArea.id}; 

    this.dialog.open(SystemCruComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
      setTimeout(() => this.getSystems(),1000);
    });
    
  }

  edit(system)
  {
    if(this.selectedArea == null)
    {
      alert("No area selected!"); 
      return; 
    }
      
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {importedSystem: system};

    this.dialog.open(SystemCruComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
      setTimeout(() => this.getSystems(),1000);
    }); 
  }

}
