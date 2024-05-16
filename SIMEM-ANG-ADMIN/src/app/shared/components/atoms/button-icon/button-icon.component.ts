import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'simem-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrl: './button-icon.component.scss',
  imports: [CommonModule, ButtonModule],
})
export class ButtonIconComponent {
  @Input() icon: string = '';

}
