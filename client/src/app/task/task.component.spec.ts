import { ComponentFixture, TestBed } from '@angular/core/testing';  
import { FormsModule } from '@angular/forms';  

import { TaskComponent } from './task.component';  

describe('TaskComponent', () => {  
  let component: TaskComponent;  
  let fixture: ComponentFixture<TaskComponent>;  

  beforeEach(async () => {  
    await TestBed.configureTestingModule({  
      declarations: [ TaskComponent ],  
      imports: [ FormsModule ]  
    }).compileComponents();  
  });  

  beforeEach(() => {  
    fixture = TestBed.createComponent(TaskComponent);  
    component = fixture.componentInstance;  
    fixture.detectChanges();  
  });  

  it('should create', () => {  
    expect(component).toBeTruthy();  
  });  

  it('should load initial tasks', () => {  
    expect(component.tasks.length).toBe(4);  
  });  

  it('should filter tasks based on search input', () => {  
    component.searchTerm = 'User 1';  
    const filtered = component.filteredTasks();  
    expect(filtered.length).toBe(1);  
    expect(filtered[0].assignedTo).toContain('User 1');  
  });  

  it('should sort tasks by assignedTo ascending', () => {  
    component.sort('assignedTo');  
    const firstTask = component.filteredTasks()[0];  
    expect(firstTask.assignedTo).toBe('User 1');  
  });  

  it('should toggle actions dropdown', () => {  
    const task = component.tasks[0];  
    expect(task.showActions).toBeUndefined();  
    component.toggleActions(task);  
    expect(task.showActions).toBe(true);  
  });  
});  