import { CommonModule, Location } from "@angular/common";
import { Component } from "@angular/core";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'back-button-component',
  templateUrl: 'back-button.component.html',
  styleUrls: ['back-button.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule
  ]
})
export class BackButtonComponent{
  constructor(private location: Location){}

  goBack(){
    this.location.back()
  }
}
