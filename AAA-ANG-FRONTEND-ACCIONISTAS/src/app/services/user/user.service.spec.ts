import { TestBed } from "@angular/core/testing"
import { UserService } from "./user.service"
import { HttpClientTestingModule, HttpTestingController, TestRequest  } from '@angular/common/http/testing';

describe("userService", () => {

    let userService: UserService;
    let testingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers:[
                UserService
            ],
            imports: [
                HttpClientTestingModule
            ]
        })
        userService = TestBed.inject(UserService)
        testingController = TestBed.inject(HttpTestingController)
    })

    it("#getUsersList() should get the users list", () => {

        userService.getUsersList().subscribe(response => {
            
        })

        const request: TestRequest = testingController.expectOne(req => {
            return req.url.includes('/usersList')
        })

        expect(request.request.method).toEqual('GET')
        expect(request.request.headers)
    })


})

