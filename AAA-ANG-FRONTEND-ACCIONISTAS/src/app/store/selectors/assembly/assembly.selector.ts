import { State } from "src/app/model/state.model";

export const getAssemblyListDropdown = (state: State) => state.assemblystate?.assemblyList?.map(element => {
    const fechaAsamblea = new Date(element.FECHA_ASAMBLEA);
    const formattedDate = fechaAsamblea.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    return { ...element, FULL_NAME: `Asamblea Nro. ${element.ID} - ${formattedDate}` };
  });
  