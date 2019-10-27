import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-system-cru',
  templateUrl: './system-cru.component.html',
  styleUrls: ['./system-cru.component.scss']
})
export class SystemCruComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<SystemCruComponent>) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close();
  }


}
