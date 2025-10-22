import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Task {
  id: number;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  // Recibe los datos de la tarea desde el componente padre
  @Input() task!: Task;

  // Emite un evento cuando la tarea se marca/desmarca o se elimina la tarea
  @Output() toggle = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onToggle() {
    this.toggle.emit(this.task.id);
  }

  onDelete() {
    this.delete.emit(this.task.id);
  }
}
