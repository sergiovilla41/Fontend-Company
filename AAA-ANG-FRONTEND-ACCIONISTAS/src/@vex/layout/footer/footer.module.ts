import { CommonModule } from "@angular/common";
import { FooterComponent } from "./footer.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { NgModule } from "@angular/core";
import { SplitterModule } from "primeng/splitter";

@NgModule({
  imports: [CommonModule, MatButtonModule, SplitterModule, MatIconModule],
  declarations: [FooterComponent],
  exports: [FooterComponent],
})
export class FooterModule {}
