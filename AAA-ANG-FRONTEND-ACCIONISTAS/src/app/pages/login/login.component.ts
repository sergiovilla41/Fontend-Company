import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";

import { ErrorStateMatcher } from "@angular/material/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { State } from "src/app/model/state.model";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { UserState } from "src/app/store/reducers/user/user.reducer";
import { validateUser } from "src/app/store/actions/user.action";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  public myForm!: FormGroup;
  hide = true;
  matcher = new MyErrorStateMatcher();
  userState: UserState;
  subscription: Subscription;
  storeSubscription: Subscription;

  constructor(
    private fg: FormBuilder,
    private router: Router,
    private store: Store<State>,
    private _snackBar: MatSnackBar
  ) {
    this.myForm = this.fg.group({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {
    this.storeSubscription = this.store.subscribe(({ userState }) => {
      this.userState = userState;
      if (this.userState.isUser === true) {
        this.router.navigate(["../"]);
      }
/*       if (this.userState.isUser === false && userState.text) {
        this.snackBar();
      } */
    });
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

  public submitFormulario() {
    if (this.myForm.invalid) {
      Object.values(this.myForm.controls).forEach((control) => {
        control.markAsTouched();
      });
    } else {
      this.store.dispatch(validateUser({ user: this.myForm.value }));
    }
  }

  public snackBar() {
    
    if (this.userState.isUser === false) {
      this._snackBar.open(this.userState.text, "Cerrar", {
        duration: 4000,
        verticalPosition: "top",
        panelClass: ["notif-success"],
      });
    }
  }

  public forgotPassword() {
    this.router.navigateByUrl("forgotPassword");
  }
}
