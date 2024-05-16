import {
  CategoryModel,
  CategoryTreeNode,
  DataSetModel,
} from '../../model/dataset/datasets.model';
import { State } from '../../model/state.model';
import { ClasificationRegulatoryModel } from '../../model/dataset/datasets.model';

export const selectDataSets = (state: State) => state?.dataSets.dataSetsItems;

export const selectBasicInformation = (state: State) =>
  state.dataSets?.basicDataDataSet;

export const selectCategories = (state: State) =>
  categoryTreeNode(state?.dataSets?.categoriesItems);

export const selectDurationISO = (state: State) =>
  state?.dataSets.durationISOItems;

export const selectGranularity = (state: State) =>
  state?.dataSets.granularityItems;

export const selectPeriodicity = (state: State) =>
  state?.dataSets.periodicityItems;

export const selectClasificationRegulatory = (state: State) =>
  state?.dataSets.clasificationRegulatory;

export const selectHasRecord = (state: State) => state?.dataSets.hasRecord;

export const selectLabels = (state: State) => state?.dataSets.lablesItems;

export const selecttypeView = (state: State) => state?.dataSets.typeViewItems;

export const selectStatusSave = (state: State) => state.dataSets.success;

function categoryTreeNode(
  nodos: CategoryModel[],
  nivel: string = '0'
): CategoryTreeNode[] {
  if (nodos.length === 0) return [];
  let newNodos = nodos.map((nodo, index) => {
    const newNode: CategoryTreeNode = {
      key: nivel + '-' + index,
      label: nodo.titulo,
      expanded: false,
      data: {
        title: nodo.titulo,
        descripcion: nodo.descripcion,
        id: nodo.id,
      },
    };

    if (nodo.children) {
      newNode.children = categoryTreeNode(nodo.children, newNode.key);
    }
    return newNode;
  });
  return newNodos;
}
