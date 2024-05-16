import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'simem-back-button-list',
  templateUrl: './back-button-list.component.html',
  styleUrl: './back-button-list.component.scss',
  imports: [CommonModule, ButtonModule],
})
export class BackButtonListComponent {
  @Input() title: string = '';
  @Input() showIcon: boolean = false;
  @Output() back = new EventEmitter<any>();

  goBack() {
    this.back.emit();
  }
}
