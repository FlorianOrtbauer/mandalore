import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ITask } from 'src/classes/interfaces/ITask';
import { IMission } from 'src/classes/interfaces/IMission';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-task-cru',
  templateUrl: './task-cru.component.html',
  styleUrls: ['./task-cru.component.scss']
})
export class TaskCruComponent implements OnInit {

  task: ITask; 
  originalTask: ITask; 

  isEdit: boolean; 
  title: string; 
  @Input() mission: IMission; 
  
  constructor(private dialogRef: MatDialogRef<TaskCruComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api:ApiService) { 
      console.log(data); 
    }

  ngOnInit() { 
    if(this.data.importedTask)
    {
      this.title = "Edit task";
      this.task = this.data.importedTask; 
      this.isEdit = true; 
    }
    else
    {
      this.title = "Add new task"; 
      this.task = {} as ITask; 
      this.task.mission_id = this.data.mission_id; 
      this.isEdit = false; 
    }
      
  }

  cancel() {
    this.task = this.originalTask;  
    console.log(this.task); 
    this.dialogRef.close();
  }

  save() {
    if(this.isEdit)
      this.api.editTask(this.task); 
    else
      this.api.addTask(this.task); 
    this.dialogRef.close();
  }


}
