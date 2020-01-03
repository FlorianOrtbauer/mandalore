import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ISite } from 'src/classes/interfaces/ISite';
import { IClient } from 'src/classes/interfaces/IClient';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { SiteCruComponent } from '../dialogs/site-cru/site-cru.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {

  //displayedColumns: string[] = ['select','name', 'priority', 'country', 'edit', 'delete'];
  displayedColumns: string[] = ['select', 'name', 'priority', 'country', 'edit', 'delete'];
  dataSource: MatTableDataSource < ISite > = new MatTableDataSource([]);
  selection = new SelectionModel<ISite>(false, [], );

  @Input() selectedClient: IClient;
  @Output() sitesChanged = new EventEmitter<ISite[]>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private api:ApiService, private dialog:MatDialog) {
    this.selection.changed.subscribe((change) => {
    console.log(this.selection.selected);
    this.sitesChanged.emit(this.selection.selected)
  });
}

  ngOnInit() {
    this.getSites();
    //this.dataSource.sort = this.sort;
  }

  ngOnChanges() {
    if(this.selectedClient == null){
      this.dataSource=null;
      return;
    }

    this.getSites();
  }

  getSites() {
    if (!this.selectedClient){
      console.log("no Client selected");
      this.dataSource=null;
      return
    }

    console.log("Get Sites of user:", this.selectedClient.id);


    this.api.getSitesByClient(this.selectedClient.id)
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

  checkboxLabel(row?: ISite): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
  }

  edit(site)
  {
    // if(this.selectedClient == null)
    // {
    //   alert("No Client selected!");
    //   return;
    // }

    console.log(site);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = {importedSite: site};

    this.dialog.open(SiteCruComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
      this.getSites();
    });
  }

  AddNewSite() {

    // if(this.selectedArea == null)
    // {
    //   alert("No area selected!");
    //   return;
    // }
    if (!this.selectedClient){
      alert("Choose a Client first!");
      return;
    }

    console.log("Selected Client ID: ", this.selectedClient.id);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data =  {'client_id': this.selectedClient.id};

    this.dialog.open(SiteCruComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
      this.getSites();
    });

  }

  delete(site)
  {
    if(confirm("Are you sure to delete the selected site?")) {
      this.api.deleteSite(site);
      setTimeout(() => this.getSites(),1000);
    }
  }



}
