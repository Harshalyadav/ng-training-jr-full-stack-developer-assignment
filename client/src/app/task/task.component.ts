import { Component, OnInit } from '@angular/core';  

interface Task {  
  assignedTo: string;  
  status: string;  
  dueDate: string;  
  priority: string;  
  comments: string;  
  showActions?: boolean; // for dropdown menu toggle  
  selected?: boolean; // for checkbox  
}  

@Component({  
  selector: 'app-task',  
  templateUrl: './task.component.html',  
  styleUrls: ['./task.component.css']  
})  
export class TaskComponent implements OnInit {  
  tasks: Task[] = [];  
  searchTerm: string = '';  
  sortColumn: string = '';  
  sortDirection: 'asc' | 'desc' = 'asc';  

  ngOnInit() {  
    // Initialize with sample data  
    this.tasks = [  
      { assignedTo: 'User 1', status: 'Completed', dueDate: '2024-12-10', priority: 'Low', comments: 'This task is good' },  
      { assignedTo: 'User 2', status: 'In Progress', dueDate: '2024-09-14', priority: 'High', comments: 'This...' },  
      { assignedTo: 'User 3', status: 'Not Started', dueDate: '2024-08-18', priority: 'Low', comments: 'This...' },  
      { assignedTo: 'User 4', status: 'In Progress', dueDate: '2024-06-12', priority: 'Normal', comments: 'This...' },  
    ];  
  }  

  toggleActions(task: Task) {  
    task.showActions = !task.showActions;  
  }  

  createTask() {  
    // Logic to create task  
    alert('Create New Task clicked');  
  }  

  refresh() {  
    // Logic to refresh  
    alert('Refresh clicked');  
  }  

  deleteTask(task: Task) {  
    this.tasks = this.tasks.filter(t => t !== task);  
  }  

  editTask(task: Task) {  
    // Logic to edit task  
    alert(`Edit task assigned to ${task.assignedTo}`);  
  }  

  toggleSelectAll(event: any) {  
    const isChecked = event.target.checked;  
    this.tasks.forEach(task => task.selected = isChecked);  
  }  

  filteredTasks() : Task[] {  
    let filtered = this.tasks.filter(task =>  
      task.assignedTo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||  
      task.status.toLowerCase().includes(this.searchTerm.toLowerCase()) ||  
      task.comments.toLowerCase().includes(this.searchTerm.toLowerCase())  
    );  

    if (this.sortColumn) {  
      filtered.sort((a, b) => {  
        const aVal = (a as any)[this.sortColumn];  
        const bVal = (b as any)[this.sortColumn];  

        if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;  
        if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;  
        return 0;  
      });  
    }  

    return filtered;  
  }  

  sort(column: string) {  
    if (this.sortColumn === column) {  
      // toggle direction  
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';  
    } else {  
      this.sortColumn = column;  
      this.sortDirection = 'asc';  
    }  
  }  
}  