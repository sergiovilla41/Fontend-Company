import { EncryptService } from "./encrypt.service"
import { MsalService } from "@azure/msal-angular";

describe("EncryptService", () => {
  let service: EncryptService;
  let serviceSpy: jasmine.SpyObj<MsalService>;

  beforeEach(() => {
    serviceSpy = jasmine.createSpyObj('MsalService', ['getValue'],
      {
        instance: {
          getActiveAccount() {
            return { idTokenClaims: { name: "unknown" } }
          }
        }
      });
    service = new EncryptService(serviceSpy)
  })

  it('#ngOnInit() should call the store', () => {
    sessionStorage.removeItem("user")
    service.getUser()
  })
})
