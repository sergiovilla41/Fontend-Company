import { Component } from "@angular/core";
import { HomeTemplateComponent } from "../../shared/components/templates/home-template/home-template.component";

@Component({
  selector: 'home-component',
  templateUrl: 'home.component.html',
  styleUrl: 'home.component.scss',
  standalone: true,
  imports: [
    HomeTemplateComponent
  ]
})
export class HomeComponent { }
