import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api-service.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { SystemCruComponent } from '../dialogs/system-cru/system-cru.component';
import { ISystem } from 'src/classes/interfaces/ISystem';
import { IArea } from 'src/classes/interfaces/IArea';

export interface SystemComponent {
  name: string;
  priority: number;
  selected: boolean;
}

@Component({
  selector: 'app-systems',
  templateUrl: './systems.component.html',
  styleUrls: ['./systems.component.scss']
})
export class SystemsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'priority'];
  dataSource: MatTableDataSource < ISystem > ;
  selectedSystems: ISystem[] = [];
  isSelected: boolean = true; 

  @Input() selectedArea: IArea; 
  @Output() systemsChanged = new EventEmitter<ISystem[]>();

  constructor(private api:ApiService, private dialog:MatDialog) {}

  getSystems() {
    console.log("Get Systems for "+this.selectedArea)
    this.api.getSystemsByArea(this.selectedArea.id)
      .subscribe(data => {
        data.forEach(element => {element.area = this.selectedArea;});
        this.dataSource = new MatTableDataSource(data);  
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log("OnChange triggered")
    this.selectedSystems = [];
    this.getSystems(); 
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectRow(row){
    var index = this.selectedSystems.indexOf(row); 
    if(index !== -1)
    {
      this.selectedSystems.splice(index, 1);
      this.selectedSystems = this.selectedSystems.slice(); //needed for event because no detection on content change
      this.systemsChanged.emit(this.selectedSystems); 
    }
    else{
      this.selectedSystems.push(row); 
      this.selectedSystems = this.selectedSystems.slice(); //needed for event because no detection on content change
      this.systemsChanged.emit(this.selectedSystems);
    }
  }
  
  openDialog() {

    if(this.selectedArea == null)
    {
      alert("No area selected!"); 
      return; 
    }
      
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.dialog.open(SystemCruComponent, dialogConfig);
  }

}
