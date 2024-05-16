import { ComponentFixture, TestBed } from "@angular/core/testing"
import { LoginComponent } from "./login.component"
import { FormBuilder, ReactiveFormsModule } from "@angular/forms"
import { Router, provideRouter } from "@angular/router"
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { State } from "src/app/model/state.model"
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar"
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from "@angular/material/icon"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { storeInitialStateMock } from "src/app/mocks/initialState.mock"
import { CommonModule } from "@angular/common"


describe("LoginComponent", () => {

    let loginComponent: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>
    let store: MockStore<State>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [
                RouterTestingModule.withRoutes([]),
                ReactiveFormsModule,
                MatIconModule,
                MatSnackBarModule,
                MatFormFieldModule,
                MatInputModule,
                BrowserAnimationsModule,
                CommonModule
            ],
            providers: [
                provideMockStore({
                    initialState: storeInitialStateMock
                }),
                provideRouter([{
                    path: '**',
                    component: LoginComponent
                }])
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent)
        loginComponent = fixture.componentInstance;
        store = TestBed.inject(MockStore);
    })

    it('#ngOnInit should subscribe to store', () => {
        expect(loginComponent.userState).toBeUndefined();
        loginComponent.ngOnInit();
        expect(loginComponent.userState).toEqual(storeInitialStateMock.userState);
    })

    it('should contain the title in a h1 tag', () => {
        fixture.nativeElement as HTMLElement
        expect(fixture.nativeElement.querySelector('h1').textContent).toEqual('ACCIONISTAS')
    })

    it('should contain two inputs for email and password', () => {
        fixture.nativeElement as HTMLElement
        const emailInput = fixture.nativeElement.querySelector(`input[id='email']`)
        const passwordInput = fixture.nativeElement.querySelector(`input[id='password']`)

        expect(emailInput.value).toEqual('');
        expect(passwordInput.value).toEqual('');
    })

    it('myForm.invalid should be true if the inputs are empty', () => {
        loginComponent.ngOnInit(); //initializing the component

        fixture.nativeElement as HTMLElement
        const emailInput = fixture.nativeElement.querySelector(`input[id='email']`)
        const passwordInput = fixture.nativeElement.querySelector(`input[id='password']`)

        expect(emailInput.value).toEqual('');
        expect(passwordInput.value).toEqual('');
        expect(loginComponent.myForm.invalid).toEqual(true)
    })

    it('should set all form controls as touched when the form is invalid and is submitted', () => {
        loginComponent.ngOnInit(); //initializing the component
        fixture.detectChanges();

        fixture.nativeElement as HTMLElement
        const emailInput = fixture.nativeElement.querySelector(`input[id='email']`)
        const passwordInput = fixture.nativeElement.querySelector(`input[id='password']`)

        expect(emailInput.value).toEqual('');
        expect(passwordInput.value).toEqual('');
        expect(loginComponent.myForm.controls.email.touched).toEqual(false)
        expect(loginComponent.myForm.controls.password.touched).toEqual(false)

        emailInput.value = 'prueba1@aaa.com';
        passwordInput.value = '12345';
        loginComponent.submitFormulario();
        emailInput.dispatchEvent(new Event('input'))
        passwordInput.dispatchEvent(new Event('input'))
        fixture.detectChanges();

        expect(loginComponent.myForm.controls.email.touched).toEqual(true)
        expect(loginComponent.myForm.controls.password.touched).toEqual(true)

    })

    it('should call #snackBar when isUser === false and text is truthy', () => {
        spyOn(loginComponent, 'snackBar')
        loginComponent.ngOnInit();
        store.setState({ ...storeInitialStateMock, userState: { isUser: false, text: 'is not user' } })
        expect(loginComponent.snackBar).toHaveBeenCalled()
    })

    it('should go to the root when the user is correct', () => {
        loginComponent.ngOnInit();

        store.setState({ ...storeInitialStateMock, userState: { isUser: true } });
        expect(loginComponent.userState).toEqual({ isUser: true });

        expect(TestBed.inject(Router).url).toEqual('/')
    })

    it('#forgotPassword() should open the route /forgotPassword', () => {
        spyOn(loginComponent, 'forgotPassword')
        loginComponent.ngOnInit();

        const forgotPassword = fixture.nativeElement.querySelector('a[id="forgotPassword"]')
        forgotPassword.click();
        expect(loginComponent.forgotPassword).toHaveBeenCalled();
    })

    it('#submitFormulario() should be called when the iniciar sesion button is clicked', () => {
        spyOn(loginComponent, 'submitFormulario');
        loginComponent.ngOnInit();
        fixture.detectChanges()

        const iniciarSesionButton = fixture.nativeElement.querySelector('button[id="login"]');

        iniciarSesionButton.click();

        expect(loginComponent.submitFormulario).toHaveBeenCalled();
    })
})
