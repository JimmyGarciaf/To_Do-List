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
  currentUserName: string = 'Usuario Anónimo';

  ngOnInit(): void {
    // 1. Cargar el nombre de usuario guardado
    this.loadUserName();
    
    // 2. Cargar las tareas guardadas.
    this.loadTasks();

    // 3. Lógica para tareas iniciales: Solo si la lista está vacía
    if (this.tasks.length === 0) {
      // Estas tareas SÓLO se añaden la primera vez que la app se carga
      // y el localStorage está vacío.
      this.tasks = [
        { 
          id: Date.now() - 3, 
          description: 'Configurar el proyecto de Angular', 
          completed: false,
          createdBy: this.currentUserName, // Asignar el usuario por defecto o cargado
          createdAt: Date.now() - 300000 // Hora aproximada anterior
        },
        { 
          id: Date.now() - 2, 
          description: 'Añadir el componente de TaskItem', 
          completed: false,
          createdBy: this.currentUserName,
          createdAt: Date.now() - 200000
        },
        { 
          id: Date.now() - 1, 
          description: 'Terminar mi To-Do List', 
          completed: false,
          createdBy: this.currentUserName,
          createdAt: Date.now() - 100000
        },
      ];
      this.saveTasks(); // Guardar estas tareas iniciales en localStorage
    }
  }
  // Lógica para guardar las tareas en localStorage
  saveTasks() {
    localStorage.setItem('angularTodoListTasks', JSON.stringify(this.tasks));
  }

  // Lógica para cargar las tareas desde localStorage
  loadTasks() {
    const savedTasks = localStorage.getItem('angularTodoListTasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
    // Si no hay tareas guardadas, usa las iniciales (las eliminamos si ya implementamos load/save)
    // this.tasks = [ ... ] 
  }

  // Lógica para guardar/cargar el nombre de usuario
  loadUserName() {
    const savedName = localStorage.getItem('todoUserName');
    if (savedName) {
      this.currentUserName = savedName;
    }
  }

  saveUserName() {
    localStorage.setItem('todoUserName', this.currentUserName);
  }

  // AGREGAR TAREA (Modificada)
  addTask() {
    if (this.newTaskDescription.trim() && this.currentUserName.trim()) {
      const newTask: Task = {
        id: Date.now(), 
        description: this.newTaskDescription.trim(),
        completed: false,
        createdBy: this.currentUserName, // ASIGNAR USUARIO ACTUAL
        createdAt: Date.now(),           // ASIGNAR TIMESTAMP ACTUAL
      };
      this.tasks.unshift(newTask); // Usamos unshift para que la nueva tarea vaya al inicio
      this.newTaskDescription = ''; 
      this.saveTasks(); // Guardar después de agregar
    }
  }

  // TOGGLE y DELETE (Modificados para guardar)
  toggleTask(id: number) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks(); // Guardar después de modificar
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveTasks(); // Guardar después de eliminar
  }

}
