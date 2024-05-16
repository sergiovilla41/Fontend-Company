import { LoadingService } from "./loading-service"

describe("LayoutComponent", () => {
  const service = new LoadingService()

  it('#ngOnInit() should call the store', () => {
    service.getLoading();
    service.setLoading(true)
  })
})
