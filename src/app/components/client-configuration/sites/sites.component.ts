import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ISite } from 'src/classes/interfaces/ISite';
import { IClient } from 'src/classes/interfaces/IClient';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { SiteCruComponent } from '../dialogs/site-cru/site-cru.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})


export class SitesComponent implements OnInit {

  //Config der Material-Table
  displayedColumns: string[] = ['select', 'name', 'priority', 'country', 'edit', 'delete'];
  dataSource: MatTableDataSource < ISite > = new MatTableDataSource([]);
  //Config Selection
  initialSelection = [];
  allowMultiSelect:boolean = false;
  selection = new SelectionModel<ISite>(this.allowMultiSelect, this.initialSelection);

  @Input() selectedClient: IClient;
  @Output() sitesChanged = new EventEmitter<ISite[]>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private api:ApiService, private dialog:MatDialog) {
    
    this.selection.changed.subscribe((change) => {
      console.log("Site Component selected:", this.selection.selected);
      this.sitesChanged.emit(this.selection.selected);
    });
}

  ngOnInit() {
    this.getSites();
  }

  ngOnChanges() {
    if(this.selectedClient == null){
      //Kein Client gewählt --> Sites Table leeren
      this.dataSource=null;
    } else {
      //Lade die zum Client zugehörigen Sites
      this.getSites();
    }
  }

  getSites() {
    if (!this.selectedClient){
      //Notwendig für das initiale Laden bei ngOnInit
      console.log("Tried to Select site, but no Client selected");
      this.dataSource=null;
      return
    }

    console.log("Load Sites of Client:", this.selectedClient.id);

    this.api.getSitesByClient(this.selectedClient.id).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
    });
  }

  edit(site)
  {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = {forwarededSite: site};

    this.dialog.open(SiteCruComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
      this.getSites();
    });
  }

  AddNewSite() {

    if (!this.selectedClient){
      alert("Choose a Client first!");
      return;
    }

    console.log("Add new Site for Client ID: ", this.selectedClient.id);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data =  {client_id: this.selectedClient.id};

    this.dialog.open(SiteCruComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
      this.getSites();
    });

  }

  delete(site){
    //Öffne den Löschen Dialog
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data =  {forwardedObject: site, deleteType: "site"};

    this.dialog.open(DeleteDialogComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
      this.getSites();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleSelection($event, row)
  {
    this.selection.toggle(row);
  }

  checkboxLabel(row?: ISite): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
  }

  



}
