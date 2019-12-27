import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { IClient} from 'src/classes/interfaces/IClient';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ClientCruComponent } from '../dialogs/client-cru/client-cru.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'priority', 'country', 'edit', 'delete'];
  dataSource: MatTableDataSource < IClient > = new MatTableDataSource([]);
  selection = new SelectionModel<IClient>(false, [], );

  
  @Output() clientChanged = new EventEmitter<IClient[]>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private api:ApiService, private dialog:MatDialog) {
    this.selection.changed.subscribe((change) => {
        console.log(this.selection.selected);
        this.clientChanged.emit(this.selection.selected)
      }
    );
  }
  
  ngOnInit() {
    this.getClients();
    this.dataSource.sort = this.sort;
  }


  toggleSelection($event, row)
  {
    if($event.target.tagName === "I")
      return; 
    this.selection.toggle(row); 
  }

  checkboxLabel(row?: IClient): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row}`;
  }


  getClients() {
    console.log("Get all Clients"); 
    this.api.getAllClients()
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



  edit(client)
  {
    // if(this.selectedClient == null)
    // {
    //   alert("No Client selected!"); 
    //   return; 
    // }
      
    console.log(client);

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data = {importedClient: client};

    this.dialog.open(ClientCruComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
      this.getClients();
    }); 
  }

  AddNewClient() {

    // if(this.selectedArea == null)
    // {
    //   alert("No area selected!"); 
    //   return; 
    // }
    
    console.log("Hallo");

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';
    dialogConfig.data =  {};

    this.dialog.open(ClientCruComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(() => {
      this.getClients();
    });
    
  }

  delete(client)
  {
    if(confirm("Are you sure to delete the selected client?")) {
      this.api.deleteClient(client);
      setTimeout(() => this.getClients(),1000);
    }
  }



}
