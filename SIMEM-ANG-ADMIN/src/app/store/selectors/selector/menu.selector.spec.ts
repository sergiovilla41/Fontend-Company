import { initialState } from "../../../shared/mocks/store.mock"
import { selectMenuItems } from "./menu.selector"

describe("MenuSelector", () => {

  it('menuSelector', () => {
    selectMenuItems(initialState)
  })
})
