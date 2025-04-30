import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  taskForm: FormGroup;
  UserData: Task[] = [];  
  constructor(private fb: FormBuilder, private TaskService: TaskService) {
    this.taskForm = this.fb.group({
      taskDueDate: [''],
      assignedTo: [''],
      status: [''],
      priority: [''],
      comments: ['']
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      // Prepare the task object
      const task: Task = {
      
        dueDate: this.taskForm.value.taskDueDate,
        assignedTo: this.taskForm.value.assignedTo,
        status: this.taskForm.value.status,
        priority: this.taskForm.value.priority,
        comments: this.taskForm.value.comments
      };

    
      this.TaskService.create(task).subscribe({
        next: (response) => {
          console.log('Task created successfully:', response);

          this.taskForm.reset();
        },
        error: (error) => {
          console.error('There was an error!', error);
      
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  async getData(): Promise<void> {
    try {
      const data = await firstValueFrom(this.TaskService.getAll()); // Use firstValueFrom to get the first emitted value
      console.log('Data:', data);  // Log data for debugging
      if (data && data.length > 0) {
        this.UserData = data;  // Assign the data to UserData property
      }
    } catch (error) {
      console.error('Error fetching data:', error);  // Handle any errors
    }
  }
}
