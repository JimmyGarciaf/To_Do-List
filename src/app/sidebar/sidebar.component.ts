import { Component, signal } from '@angular/core';
import { ListStateService } from '../services/list-state.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private uiState: ListStateService) {}
  
  // Lista estática de elementos del menú (simulando rutas/vistas)
  menuItems = signal([
    { icon: 'ti ti-sun', label: 'Mi día', count: null, active: true, isList: false },
    { icon: 'ti ti-star', label: 'Importante', color: '#EB5757', count: null, active: false, isList: false },
    { icon: 'ti ti-calendar-event', label: 'Planeado', color: '#6FCF97', count: null, active: false, isList: false },
    { icon: 'ti ti-user-check', label: 'Asignado a mí', color: '#BB6BD9', count: null, active: false, isList: false },
    { icon: 'ti ti-home', label: 'Tareas', color: '#F2C94C', count: null, active: false, isList: false }
  ]);
  // Maneja la selección de un elemento del menú
  selectItem(selectedItem: any) {
    this.menuItems.update(items =>
      items.map(item => ({
        ...item,
        active: item === selectedItem
      }))
    );
    // actualizar el estado global
    this.uiState.setSelectedList({
      label: selectedItem.label,
      icon: selectedItem.icon
    });
  }
  

  // Maneja la adición de una nueva lista (funcionalidad base)
  addNewList() {
    console.log('Se disparó la acción: Añadir nueva lista');
    // Aquí iría la lógica para abrir un modal o añadir un nuevo input de lista.
  }
}
