import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'home-template-component',
  standalone: true,
  templateUrl: 'home-template.component.html',
  styleUrl: 'home-template.component.scss',
  imports: [CardModule, ImageModule],
})
export class HomeTemplateComponent {}
