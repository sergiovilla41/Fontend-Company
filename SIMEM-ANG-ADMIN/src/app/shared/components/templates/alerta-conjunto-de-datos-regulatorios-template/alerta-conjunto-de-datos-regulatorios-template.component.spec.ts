import { AlertaConjuntoDeDatosRegulatoriosTemplateComponent } from "./alerta-conjunto-de-datos-regulatorios-template.component"

describe("AlertaConjuntoDeDatosRegulatoriosTemplateComponent", () => {
  let component = new AlertaConjuntoDeDatosRegulatoriosTemplateComponent()
  it("#ngOnChanges() should update class properties", () => {
    component.regulatoryDatasets = []
    component.ngOnChanges({ "regulatoryDatasets": { currentValue: [], firstChange: false, previousValue: [], isFirstChange: () => false } })
  })
})
