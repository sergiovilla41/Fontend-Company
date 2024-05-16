import { initialState } from "../../../shared/mocks/store.mock"
import { selectEmpresas, selectIsAllowedUser } from "./security.selector"

describe("SecuritySelector", () => {

  it('menuSelector', () => {
    selectEmpresas(initialState)
    selectIsAllowedUser(initialState)
  })
})
