import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api-service.service';
import { IArea } from 'src/classes/interfaces/IArea';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  areas: IArea[];
  selectedArea: IArea; 
  selectedAreaId: string; 
  @Output() areaChanged = new EventEmitter<IArea>();

  constructor(private api:ApiService) {
    this.getSites();
  }
  getSites = () => {
    this.api.getAllAreas().subscribe (
      data => {
        this.areas = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  changeArea(){
    this.selectedArea = this.areas.find(element => element.id === this.selectedAreaId);
    this.areaChanged.emit(this.selectedArea); 
  }

  ngOnInit() {
  }
}
