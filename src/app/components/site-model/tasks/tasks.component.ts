import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api-service.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { TaskCruComponent } from '../dialogs/task-cru/task-cru.component';
import { IMission } from 'src/classes/interfaces/IMission';
import { ITask } from 'src/classes/interfaces/ITask';
import { SelectionModel } from '@angular/cdk/collections';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'priority', 'short_desc', 'instruction', 'edit'];
  dataSource: MatTableDataSource < ITask > = new MatTableDataSource([]);
  selection = new SelectionModel<ITask>(false, [], );

  @Input() selectedMission: IMission;
  @Output() tasksChanged = new EventEmitter<ITask[]>();

  constructor(private api:ApiService, private dialog: MatDialog) {
    this.selection.changed.subscribe((change) => this.changeSelectedTasks()) ;
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  getTasks() {

    console.log("Get tasks for "+this.selectedMission)
    this.api.getTasksByMission(this.selectedMission.id)
      .subscribe(data => {
          data.forEach(element => {element.mission = this.selectedMission});
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
        },
        error => {
          console.log(error);
        }
      );
  }

  changeSelectedTasks() {
    this.tasksChanged.emit(this.selection.selected);
  }

  delete()
  {
    if(this.selection.selected.length === 0)
    {
      alert("No tasks selected!");
      return;
    }

    if(confirm("Are you sure to delete the selected tasks?")) {
      this.api.deleteTasks(this.selection.selected);
      setTimeout(() => this.getTasks(),1000);
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
    if(this.selectedMission == null)
      this.dataSource = new MatTableDataSource([]);

    this.selection.clear();
    this.getTasks();
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

  checkboxLabel(row?: ITask): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
  }

  openAddDialog() {

    if(this.selectedMission == null)
    {
      alert("No mission selected!");
      return;
    }

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data =  {'mission_id': this.selectedMission.id};

    this.dialog.open(TaskCruComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
      setTimeout(() => this.getTasks(),1000);
    });

  }

  edit(task)
  {
    if(this.selectedMission == null)
    {
      alert("No mission selected!");
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {importedTask: task};

    this.dialog.open(TaskCruComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
      setTimeout(() => this.getTasks(),1000);
    });
  }

}
