import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { ToolbarComponent } from "../../shared/components/organisms/toolbar/toolbar.component";
import { Store } from "@ngrx/store";
import { State } from "../../store/model/state.model";
import { selectMenuItems } from "../../store/selectors/selector/menu.selector";
import { getMenuItems } from "../../store/actions/menu.action";
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { LoadingService } from "../../shared/services/loading-service/loading-service";

@Component({
  selector: 'layout-component',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ToolbarComponent,
    SidebarModule,
    PanelMenuModule,
    ProgressSpinnerModule,
    DialogModule
  ],
  templateUrl: 'layout.component.html',
  styleUrl: 'layout.component.scss'
})
export class LayoutComponent implements OnInit{
  isOpen = false;
  visible = true;
  menuOptions = this.store.select(selectMenuItems);

  constructor(private store: Store<State>, private loadingService: LoadingService, private router: Router){}

  ngOnInit(): void {
    this.router.events.subscribe(() => this.isOpen = false)
    this.loadingService.getLoading().subscribe(a => this.visible = a)
    this.store.dispatch(getMenuItems())
  }
}
