import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListStateService {

  // Guardará el nombre del listado seleccionado y su icono
  selectedList = signal<{ label: string, icon: string, color: string }>({
    label: 'Mi día',
    icon: 'ti ti-sun',
    color: '#0078d4'
  });

  setSelectedList(list: { label: string, icon: string, color: string }) {
    this.selectedList.set(list);
  }
}