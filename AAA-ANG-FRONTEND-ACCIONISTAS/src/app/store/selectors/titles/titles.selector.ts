import { State } from "src/app/model/state.model";

export const getTitlesListDropdown = (state: State) => state.titleState?.titleList?.map(element => {
    return { ...element, FULL_NAME: element.CONSECUTIVO };
  });


