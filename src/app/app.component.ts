import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasksListComponent } from './tasks-list/tasks-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TasksListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  private readonly PLACEHOLDER_FOCUS = 'Buscar';
  private readonly PLACEHOLDER_BLUR = ' '; // Espacio invisible
  
  // --- Signals para el estado
  isFocused = signal(false);
  isHovered = signal(false);
  searchValue = signal('');

  // Computed Signal para determinar si el área de búsqueda está activa (foco o hover)
  isActive = computed(() => this.isFocused() || this.isHovered());

  // --- Computed Signal para el Placeholder
  currentPlaceholder = computed(() => {
    // Si el input está vacío Y tiene el foco, muestra 'Buscar'
    if (this.isFocused() && this.searchValue().length === 0) {
      return this.PLACEHOLDER_FOCUS;
    }
    // Si el input está vacío Y NO tiene el foco, muestra el espacio (invisible)
    if (!this.isFocused() && this.searchValue().length === 0) {
      return this.PLACEHOLDER_BLUR;
    }
    // Si hay valor, el navegador se encarga de ocultar el placeholder.
    return ''; 
  });

  // --- Manejadores de Eventos
  
  handleFocus() {
    this.isFocused.set(true);
  }

  handleBlur(event: Event) {
    this.isFocused.set(false);
  }
  
  handleInput(event: Event) {
      // Actualiza la señal de valor de búsqueda en cada tipeo
      const target = event.target as HTMLInputElement;
      this.searchValue.set(target.value);
  }
}
