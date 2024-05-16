import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DialogModule } from "primeng/dialog";
import { environment } from "../../../../../environments/environment";

@Component({
  selector: 'message-component',
  standalone: true,
  templateUrl: 'message.component.html',
  styleUrl: 'message.component.scss',
  imports: [
    DialogModule,
    CommonModule
  ]
})
export class MessageComponent {
  @Input() userState?: string
  @Input() visible!: boolean
  @Output() onHide = new EventEmitter<void>()
  @Output() onLogout = new EventEmitter<void>()
  contactanosLink = environment.contactanos
  hide(){
    this.onHide.emit()
  }

  logout(){
    this.onLogout.emit()
  }
}
