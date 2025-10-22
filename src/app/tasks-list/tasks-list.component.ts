import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Necesario para el input de la nueva tarea
import { CommonModule } from '@angular/common'; // Necesario para *ngFor
import { TaskItemComponent, Task } from '../task-item/task-item.component';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [FormsModule, CommonModule, TaskItemComponent], 
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  newTaskDescription: string = '';

  ngOnInit(): void {
    // Puedes cargar tareas iniciales aquí o desde localStorage
    this.tasks = [
      { id: 1, description: 'Configurar el proyecto de Angular', completed: false },
      { id: 2, description: 'Añadir el componente de TaskItem', completed: false },
      { id: 3, description: 'Terminar mi To-Do List', completed: false },
    ];
  }

  // Métodos que manejan los eventos del hijo
  handleToggle(taskId: number) {
    const t = this.tasks.find(x => x.id === taskId);
    if (t) t.completed = !t.completed;
  }

  handleDelete(taskId: number) {
    this.tasks = this.tasks.filter(x => x.id !== taskId);
  }

  addTask() {
    if (this.newTaskDescription.trim()) {
      const newTask: Task = {
        // Usa la fecha o un contador para un id único
        id: Date.now(), 
        description: this.newTaskDescription.trim(),
        completed: false,
      };
      this.tasks.push(newTask);
      this.newTaskDescription = ''; // Limpiar el input
    }
  }

  toggleTask(id: number) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
  }
}
