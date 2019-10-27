import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api-service.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { SystemCruComponent } from '../dialogs/system-cru/system-cru.component';
import { ISystem } from 'src/classes/interfaces/ISystem';
import { IComponent } from 'src/classes/interfaces/IComponent';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent implements OnInit {

  displayedColumns: string[] = ['system', 'name', 'priority'];
  dataSource: MatTableDataSource < IComponent > ;
  selectedComponents: IComponent[] = []; 
  @Input() selectedSystems: ISystem[];

  constructor(private api:ApiService, private dialog: MatDialog) { 

  }

  getComponents() {
    if(this.selectedSystems == null)
      return; 

    var collectedData: IComponent[] = []; 

    for(var i = 0; i < this.selectedSystems.length; i++)
    {
      
      let currentSystem = this.selectedSystems[i];
      this.api.getComponentBySystem(currentSystem.id).subscribe (
        (data) => { 
          for(var j = 0; j < data.length; j++)
          {
            var elem = data[j];
            elem.system = currentSystem;
            collectedData.push(elem); 
          }
          this.dataSource = new MatTableDataSource(collectedData); 
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.selectedComponents = [];
    this.dataSource = null; 
    this.getComponents(); 
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectRow(row){
    console.log(row); 
    var index = this.selectedComponents.indexOf(row); 
    if(index !== -1)
    {
      this.selectedComponents.splice(index, 1); 
    }
    else{
      this.selectedComponents.push(row); 
    }
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.dialog.open(SystemCruComponent, dialogConfig);
  }



}
