import {Component, Inject, Input, OnInit} from '@angular/core';
import {ISite} from '../../../../../classes/interfaces/ISite';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ApiService} from '../../../../services/api-service.service';
import {IArea} from '../../../../../classes/interfaces/IArea';

@Component({
  selector: 'app-area-cru',
  templateUrl: './area-cru.component.html',
  styleUrls: ['./area-cru.component.scss']
})
export class AreaCruComponent implements OnInit {

  area: IArea;
  originalArea: IArea;

  isEdit: boolean;
  title: string;

  @Input() site: ISite;

  constructor(private dialogRef: MatDialogRef<AreaCruComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private api:ApiService) {
    console.log(data);
  }

  ngOnInit() {
    if(this.data.importedArea)
    {
      this.title = "Edit area";
      this.area = this.data.importedArea;
      this.isEdit = true;
    }
    else
    {
      this.title = "Add new area";
      this.area = {} as IArea;
      this.area.site_id = this.data.area_id;
      this.isEdit = false;
    }

  }

  cancel() {
    // this.site = this.originalSite;
    // console.log(this.site);
    this.dialogRef.close();
  }

  save() {
    if(this.isEdit)
      this.api.editArea(this.area);
    else
      this.api.addArea(this.area);
    this.dialogRef.close();
  }

}
