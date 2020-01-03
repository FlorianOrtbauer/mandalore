import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { IArea } from 'src/classes/interfaces/IArea';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { SelectionModel } from '@angular/cdk/collections';
import {ISite} from 'src/classes/interfaces/ISite';
import {AreaCruComponent} from '../dialogs/area-cru/area-cru.component';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {

  displayedColumns: string[] = ['name', 'priority', 'edit', 'delete']; //, 'priority', 'country', 'edit', 'delete'];
  dataSource: MatTableDataSource < IArea > = new MatTableDataSource([]);
  selection = new SelectionModel<IArea>(false, [], );

  @Input() selectedSite: ISite;
  @Output() areaChanged = new EventEmitter<IArea[]>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private api:ApiService, private dialog:MatDialog) {
    this.selection.changed.subscribe((change) => {
      console.log(this.selection.selected);
      this.areaChanged.emit(this.selection.selected);
    });
  }

  ngOnInit() {
    this.getAreas();
    //this.dataSource.sort = this.sort;
  }

  ngOnChanges() {
    if(this.selectedSite == null){
      this.dataSource=null;
      return;
    }

    this.getAreas();
  }

  getAreas() {
    if (!this.selectedSite){
      console.log("no Site selected");
      this.dataSource=null;
      return
    }

    console.log("Get Areas of Site:", this.selectedSite.id);


    this.api.getAreasBySite(this.selectedSite.id)
      .subscribe(data => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
        },
        error => {
          console.log(error);
        });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleSelection($event, row)
  {
    if($event.target.tagName === "I")
      return;
    this.selection.toggle(row);
  }

  checkboxLabel(row?: IArea): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
  }

  edit(area)
  {
    // if(this.selectedArea == null)
    // {
    //   alert("No Area selected!");
    //   return;
    // }

    console.log("edit area:", area);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = {importedArea: area};

    this.dialog.open(AreaCruComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
      this.getAreas();
    });
  }

  AddNewArea() {

    // if(this.selectedArea == null)
    // {
    //   alert("No area selected!");
    //   return;
    // }
    if (!this.selectedSite){
      alert("Choose a Site first!");
      return;
    }

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data =  {'site_id': this.selectedSite.id};


    this.dialog.open(AreaCruComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
      this.getAreas();
    });

  }

  delete(area)
  {
    if(confirm("Are you sure to delete the selected area?")) {
      this.api.deleteArea(area);
      setTimeout(() => this.getAreas(),1000);
    }
  }
}
