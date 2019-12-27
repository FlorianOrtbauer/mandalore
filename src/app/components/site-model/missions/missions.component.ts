import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api-service.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { MissionCruComponent } from '../dialogs/mission-cru/mission-cru.component';
import { IComponent } from 'src/classes/interfaces/IComponent';
import { IMission } from 'src/classes/interfaces/IMission';
import { SelectionModel } from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
})
export class MissionsComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'priority', 'short_desc', 'mission_type', 'edit'];
  dataSource: MatTableDataSource < IMission > = new MatTableDataSource([]);
  selection = new SelectionModel<IMission>(false, [], );

  @Input() selectedComponent: IComponent;
  @Output() missionsChanged = new EventEmitter<IMission[]>();

  constructor(private api:ApiService, private dialog: MatDialog) {
    this.selection.changed.subscribe((change) => this.changeSelectedMissions()) ;
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  getMissions() {

    console.log("Get missions for "+this.selectedComponent)
    this.api.getMissionsByComponents(this.selectedComponent.id)
      .subscribe(data => {
          data.forEach(element => {element.component = this.selectedComponent});
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
        },
        error => {
          console.log(error);
        }
      );
  }

  changeSelectedMissions() {
    this.missionsChanged.emit(this.selection.selected);
  }

  delete()
  {
    if(this.selection.selected.length === 0)
    {
      alert("No missions selected!");
      return;
    }

    if(confirm("Are you sure to delete the selected missions?")) {
      this.api.deleteMissions(this.selection.selected);
      setTimeout(() => this.getMissions(),1000);
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
    if(this.selectedComponent == null)
      this.dataSource = new MatTableDataSource([]);

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

  openAddDialog() {

    if(this.selectedComponent == null)
    {
      alert("No component selected!");
      return;
    }

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data =  {'component_id': this.selectedComponent.id};

    this.dialog.open(MissionCruComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
      setTimeout(() => this.getMissions(),1000);
    });

  }

  edit(mission)
  {
    if(this.selectedComponent == null)
    {
      alert("No component selected!");
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {importedMission: mission};

    this.dialog.open(MissionCruComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
      setTimeout(() => this.getMissions(),1000);
    });
  }

}
