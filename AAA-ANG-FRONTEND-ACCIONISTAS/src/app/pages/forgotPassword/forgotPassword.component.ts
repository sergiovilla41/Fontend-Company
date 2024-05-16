import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from 'src/app/model/state.model';
import { User } from 'src/app/model/user.model';
import { forgotPassword, UpdateState } from 'src/app/store/actions/forgotPassword.action';
import { forgotPasswordState } from 'src/app/store/reducers/forgotPassword/forgotPassword.reducer';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-forgotPassword',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.css']
})
export class ForgotPasswordComponent implements OnInit  {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  emailForgot: User;
  forgotPasswordState: forgotPasswordState
  
  matcher = new MyErrorStateMatcher();
  
  constructor(private router: Router, private store: Store<State>, private _snackBar: MatSnackBar) {

    this.store.dispatch(UpdateState());

    this.store.subscribe(({forgotPasswordState}) => {
      
      this.forgotPasswordState = forgotPasswordState;
      
      
      if(this.forgotPasswordState.status){
        this.snackBar(this.forgotPasswordState.status);
        this.store.dispatch(UpdateState());
      }

    });


   }

  ngOnInit() {

  }

  public sendEmailForgotPassword(): void {

    let email = this.emailForgot
    
    this.store.dispatch(forgotPassword({email: this.emailForgot}));

  }


  public async snackBar(status){

    let panelclass;
    let message;
    
    if(status == 200){
      panelclass = ["background-green"]
      message = this.forgotPasswordState.msg
    }

    if(status == 403){
      panelclass = ["background-red"]
      
      message = this.forgotPasswordState.msg + ": "  + this.forgotPasswordState.value;
    }

    if(status){
      await this._snackBar.open( message, 'Cerrar', { 
        duration: 4000,
        verticalPosition: 'top',
        panelClass: panelclass
      });
    }

  }

}
