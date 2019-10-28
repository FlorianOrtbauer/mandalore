import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api-service.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { SystemCruComponent } from '../dialogs/system-cru/system-cru.component';
import { SelectionModel } from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';
import { IComponent } from 'src/classes/interfaces/IComponent';
import { IMission } from 'src/classes/interfaces/IMission';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {

  displayedColumns: string[] = ['select', 'system', 'component', 'name', 'priority',
    'short_desc', 'instruction', 'mission_type'];
  dataSource: MatTableDataSource < IMission > = null;
  selection = new SelectionModel<IMission>(true, [], );

  @Input() selectedComponents: IComponent[]; 

  constructor(private api:ApiService, private dialog:MatDialog) {
  }
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  getMissions() {
    if(this.selectedComponents == null)
      return; 


    var collectedData: IMission[] = []; 

    for(var i = 0; i < this.selectedComponents.length; i++)
    {
      
      let currentComponent = this.selectedComponents[i];
      this.api.getMissionsByComponents(currentComponent.id).subscribe (
        (data) => { 
          for(var j = 0; j < data.length; j++)
          {
            var elem = data[j];
            elem.component = currentComponent;
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
    this.selection.clear();
    this.getMissions(); 
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

  checkboxLabel(row?: IMission): string {
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
