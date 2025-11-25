import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiStateService {

  // Signal que guarda la lista seleccionada: "Mi día", "Importante" etc.
  selectedList = signal<string>('Mi día');

  setSelectedList(listName: string) {
    this.selectedList.set(listName);
  }
}
