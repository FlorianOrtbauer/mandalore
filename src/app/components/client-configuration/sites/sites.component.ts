import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ISite } from 'src/classes/interfaces/ISite';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { SiteCruComponent } from '../dialogs/site-cru/site-cru.component';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'priority', 'country', 'edit', 'delete'];
  dataSource: MatTableDataSource < ISite > = new MatTableDataSource([]);

  
  @Output() sitesChanged = new EventEmitter<ISite[]>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private api:ApiService, private dialog:MatDialog) { }
  
  ngOnInit() {
    this.getSites();
  }

  getSites() {
    console.log("Get all Sites"); //Durch das User-Management im Backend werden nur die erlaubten Sites übermittelt
    this.api.getAllSites()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data);  
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changedSites() {
    this.sitesChanged.emit();
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
      
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data =  {'client_id': '935fffae-a782-4b34-a161-cd420645aad3'}; 

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
