import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MsalBroadcastService, MsalService } from "@azure/msal-angular";
import { InteractionStatus } from "@azure/msal-browser";
import { ButtonModule } from "primeng/button";
import { Subscription, filter } from "rxjs";
import { MessageComponent } from "../../shared/components/molecules/message/message.component";
import { State } from "../../store/model/state.model";
import { Store } from "@ngrx/store";
import { selectIsAllowedUser } from "../../store/selectors/security/security.selector";
import { EncryptService } from "../../shared/services/encrypt-service/encrypt.service";
import { validateUser } from "../../store/actions/security.action";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  standalone: true,
  imports: [
    ButtonModule,
    MessageComponent
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  isAllowed$ = this.store.select(selectIsAllowedUser)
  userState?: string
  modalVisible = false
  subscription?: Subscription

  constructor(private store: Store<State>, private encryptService: EncryptService, private authService: MsalService, private msalBroadcastService: MsalBroadcastService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.isAllowed$.subscribe(
      isIt => {
        if (isIt.isAllowed === false) {

          this.userState = isIt.userState;
          this.modalVisible = true;
        } else if (isIt.isAllowed === true) {
          this.router.navigate(['/home'])
        }
      }
    )
    this.authService.handleRedirectObservable().subscribe()
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        const user = this.encryptService.getUser()
        if (user) {
          this.store.dispatch(validateUser({ user }))
        }
      })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  hide() {
    this.modalVisible = false
    this.userState = undefined
  }

  logout(){
    this.modalVisible = false
    this.userState = undefined
    this.authService.logout()
  }

  login() {
    this.authService.loginRedirect({ scopes: [] })
  }
}
