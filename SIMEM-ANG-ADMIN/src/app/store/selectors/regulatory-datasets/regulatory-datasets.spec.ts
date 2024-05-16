import { initialState } from "../../../shared/mocks/store.mock"
import { selectRegulatoryDatasetsItems } from "./regulatory-datasets.selector"

describe("RegulatoryDatasetsSelector", () => {

  it('regulatoryDatasetsSelector', () => {
    selectRegulatoryDatasetsItems(initialState)
  })
})
