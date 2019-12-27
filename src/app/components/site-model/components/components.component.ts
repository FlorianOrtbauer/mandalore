import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api-service.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ComponentCruComponent } from '../dialogs/component-cru/component-cru.component';
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

  displayedColumns: string[] = ['select', 'name', 'priority', 'edit'];
  dataSource: MatTableDataSource < IComponent > = new MatTableDataSource([]);
  selection = new SelectionModel<IComponent>(false, [], );

  @Input() selectedSystem: ISystem;
  @Output() componentsChanged = new EventEmitter<IComponent[]>();

  constructor(private api:ApiService, private dialog: MatDialog) {
    this.selection.changed.subscribe((change) => this.changeSelectedComponents()) ;
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

   getComponents() {

    console.log("Get components for "+this.selectedSystem)
      this.api.getComponentsBySystems(this.selectedSystem.id)
        .subscribe(data => {
          data.forEach(element => {element.system = this.selectedSystem});
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
        },
        error => {
          console.log(error);
        }
      );
  }

  changeSelectedComponents() {
    this.componentsChanged.emit(this.selection.selected);
  }

  delete()
  {
    if(this.selection.selected.length === 0)
    {
      alert("No component selected!");
      return;
    }

    if(confirm("Are you sure to delete the selected components?")) {
      this.api.deleteComponents(this.selection.selected);
      setTimeout(() => this.getComponents(),1000);
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
    if(this.selectedSystem == null)
      this.dataSource = new MatTableDataSource([]);

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

  openAddDialog() {

    if(this.selectedSystem == null)
    {
      alert("No system selected!");
      return;
    }

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data =  {'system_id': this.selectedSystem.id};

    this.dialog.open(ComponentCruComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
      setTimeout(() => this.getComponents(),1000);
    });

  }

  edit(component)
  {
    if(this.selectedSystem == null)
    {
      alert("No system selected!");
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {importedComponent: component};

    this.dialog.open(ComponentCruComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
      setTimeout(() => this.getComponents(),1000);
    });
  }

}
