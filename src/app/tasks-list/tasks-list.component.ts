import { Component, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Necesario para el input de la nueva tarea
import { CommonModule } from '@angular/common'; // Necesario para *ngFor
import { TaskItemComponent, Task } from '../task-item/task-item.component';
import { ListStateService } from '../services/list-state.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [FormsModule, CommonModule, TaskItemComponent], 
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit {

  constructor(private uiState: ListStateService) {}

  // ESTE es el nombre dinámico de la sección
  listInfo = computed(() => this.uiState.selectedList());

  tasks: Task[] = [];
  newTaskDescription: string = '';
  todayDateFormatted: string = '';

  ngOnInit(): void {
   
    // 2. Cargar las tareas guardadas
    this.loadTasks();

    // 3. Lógica de Fecha
    this.setTodayDate();

    // 4. Lógica para tareas iniciales: Solo si la lista está vacía
    if (this.tasks.length === 0) {
      // Estas tareas SÓLO se añaden la primera vez que la app se carga
      // y el localStorage está vacío.
      this.tasks = [
        { 
          id: Date.now() - 3, 
          description: 'Configurar el proyecto de Angular', 
          completed: false,
          createdAt: Date.now() - 300000, // Hora aproximada anterior
          createdDate: new Date(Date.now() - 300000)
        },
        { 
          id: Date.now() - 2, 
          description: 'Añadir el componente de TaskItem', 
          completed: false,
          createdAt: Date.now() - 200000,
          createdDate: new Date(Date.now() - 200000)
        },
        { 
          id: Date.now() - 1, 
          description: 'Terminar mi To-Do List', 
          completed: false,
          createdAt: Date.now() - 100000,
          createdDate: new Date(Date.now() - 100000)
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
  setTodayDate(): void {
    const today = new Date();

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',  // Nombre completo del día (Ej: Jueves)
      day: 'numeric',   // Número del día (Ej: 20)
      month: 'long'     // Nombre completo del mes (Ej: Noviembre)
    };
    // Crear el string de la fecha usando el formato local (Intl)
    // toLocaleDateString('es-ES', options) genera "jueves, 20 de noviembre"
    let dateString = today.toLocaleDateString('es-ES', options);

    // Ajuste para capitalizar la primera letra (opcional, pero se ve mejor)
    dateString = dateString.charAt(0).toUpperCase() + dateString.slice(1);
    
    // Reemplazamos "de" por una coma y un espacio, para el formato "Día, Número Mes"
    // 'jueves, 20 de noviembre' -> 'Jueves, 20 Noviembre' (Ajuste estilístico)
    this.todayDateFormatted = dateString.replace(' de ', ' ');
  }
  // AGREGAR TAREA (Modificada)
  addTask() {
    if (this.newTaskDescription.trim()) {
      const newTask: Task = {
        id: Date.now(), 
        description: this.newTaskDescription.trim(),
        completed: false,
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
