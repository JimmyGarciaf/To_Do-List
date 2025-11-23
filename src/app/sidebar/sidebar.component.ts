import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  // Lista estática de elementos del menú (simulando rutas/vistas)
  menuItems = signal([
    { icon: 'ti ti-sun', label: 'Mi día', count: null, active: true, isList: false },
    { icon: 'ti ti-star', label: 'Importante', count: null, active: false, isList: false },
    { icon: 'ti ti-calendar-event', label: 'Planeado', count: null, active: false, isList: false },
    { icon: 'ti ti-user-check', label: 'Asignado a mí', count: null, active: false, isList: false },
    { icon: 'ti ti-home', label: 'Tareas', count: null, active: false, isList: false }
  ]);
  // Maneja la selección de un elemento del menú
  selectItem(selectedItem: any) {
    this.menuItems.update(items =>
      items.map(item => ({
        ...item,
        active: item === selectedItem
      }))
    );
    console.log('Elemento seleccionado:', selectedItem.label);
  }
  

  // Maneja la adición de una nueva lista (funcionalidad base)
  addNewList() {
    console.log('Se disparó la acción: Añadir nueva lista');
    // Aquí iría la lógica para abrir un modal o añadir un nuevo input de lista.
  }
}
