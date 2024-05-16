import { ToolbarComponent } from "./toolbar.component";

describe("ToolbarComponent", () => {
  const component = new ToolbarComponent();

  it('#ngOnInit() should call the store', () => {
    component.onOpenMenu()
  })
})
