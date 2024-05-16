import { Component, EventEmitter, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'toolbar-component',
  standalone: true,
  templateUrl: 'toolbar.component.html',
  styleUrl: 'toolbar.component.scss',
  imports: [
    MatIconModule
  ]
})
export class ToolbarComponent{
  @Output() openMenu = new EventEmitter()

  onOpenMenu(){
    this.openMenu.emit()
  }
}
