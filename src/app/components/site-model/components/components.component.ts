import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api-service.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { SystemCruComponent } from '../dialogs/system-cru/system-cru.component';
import { ISystem } from 'src/classes/interfaces/ISystem';
import { IComponent } from 'src/classes/interfaces/IComponent';
import { SelectionModel } from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {

  displayedColumns: string[] = ['select', 'system', 'name', 'priority'];
  dataSource: MatTableDataSource < IComponent > = null;
  selection = new SelectionModel<IComponent>(true, [], );
  
  @Input() selectedSystems: ISystem[];

  constructor(private api:ApiService, private dialog: MatDialog) { 
    // this.selection.changed.subscribe((change) => this.changeSelectedComponents()) ;
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  getComponents() {
    if(this.selectedSystems == null)
      return; 

    var collectedData: IComponent[] = []; 

    for(var i = 0; i < this.selectedSystems.length; i++)
    {
      
      let currentSystem = this.selectedSystems[i];
      this.api.getComponentsBySystems(currentSystem.id).subscribe (
        (data) => { 
          for(var j = 0; j < data.length; j++)
          {
            var elem = data[j];
            elem.system = currentSystem;
            collectedData.push(elem); 
          }
          this.dataSource = new MatTableDataSource(collectedData); 
          this.dataSource.sort = this.sort;
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }


  ngOnChanges() {
    console.log("changes in components"); 
    this.selection.clear(); 
    this.getComponents(); 
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

  checkboxLabel(row?: IComponent): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.dialog.open(SystemCruComponent, dialogConfig);
  }



}
