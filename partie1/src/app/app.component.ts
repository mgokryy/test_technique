import { Component } from '@angular/core';
import { MaisonComponent } from './components/maison/maison.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `<app-maison></app-maison>`,
  standalone: true,
  imports: [CommonModule, MaisonComponent]
})
export class AppComponent {}
