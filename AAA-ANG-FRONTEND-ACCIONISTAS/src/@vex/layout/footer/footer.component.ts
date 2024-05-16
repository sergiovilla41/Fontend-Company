import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from "@angular/core";

import { Router } from "@angular/router";

@Component({
  selector: "vex-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit, OnDestroy {
  @Input() customTemplate: TemplateRef<any>;

  constructor(private router: Router) {}

  ngOnInit() {}

  ngOnDestroy(): void {}

  dataTreatment() {
    this.router.navigate(["../tratamientoDatos"]);
  }
  termsConditionsUse() {
    this.router.navigate(["../terminosCondiciones"]);
  }
}
