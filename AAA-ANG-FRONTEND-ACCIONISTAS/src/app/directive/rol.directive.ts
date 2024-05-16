import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[appRol]'
})
export class RolDirective implements OnInit {

  roluser: string;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit(): void {
    let dataUser = JSON.parse(localStorage.getItem('dataLogin'));
    this.roluser = dataUser.rol.rol
    this.viewContainer.createEmbeddedView(this.templateRef)
    this.updateView();
  }

  private updateView(): void {
    this.viewContainer.clear();

    if (this.checkPermission()) {
      this.viewContainer.createEmbeddedView(this.templateRef)
    }

  }

  private checkPermission(): boolean {
    let hasPermission = false;
    if (this.roluser) {
      if(environment.rolAdmin === this.roluser){
        hasPermission = true;
      }
    }

    return hasPermission;
  }

}
