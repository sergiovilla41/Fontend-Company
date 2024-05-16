import { initialState } from "../../../shared/mocks/store.mock"
import { selectExecutionMonitoringItems } from "./execution-monitoring.selector"

describe("ExecutionMonitoringSelector", () => {

  it('executionMonitoringSelector', () => {
    selectExecutionMonitoringItems(initialState)
  })
})
