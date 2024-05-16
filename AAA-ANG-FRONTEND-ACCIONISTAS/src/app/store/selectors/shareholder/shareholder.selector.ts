import { DOCUMENT } from '@angular/common';
import { State } from "src/app/model/state.model";

export const getShareholderListDropdown = (state: State) => state.shareholderList?.shareholderList?.map(element => {

    let lastname = element.PRIMER_APELLIDO == null ? '' : element.PRIMER_APELLIDO;

    return {...element, FULL_NAME: element.IDENTIFICACION +" - "+ element.PRIMER_NOMBRE + ' ' + lastname};
})

export const getShareholderSeizureListDropdown = (state: State) => state.shareholderList?.shareholderSeizureList?.map(element => {

    let lastname = element.PRIMER_APELLIDO == null ? '' : element.PRIMER_APELLIDO;

    return {...element, FULL_NAME: element.IDENTIFICACION +" - "+ element.PRIMER_NOMBRE + ' ' + lastname};
})

export const getShareholderWarrantyListDropdown = (state: State) => state.shareholderList?.shareholderWarrantyList?.map(element => {

    let lastname = element.PRIMER_APELLIDO == null ? '' : element.PRIMER_APELLIDO;

    return {...element, FULL_NAME: element.IDENTIFICACION +" - "+ element.PRIMER_NOMBRE + ' ' + lastname};
})


export const getShareholderNameListDropdown = (state: State) => state.shareholderList?.shareholderList?.map(element => {
    
    let lastname = element.PRIMER_APELLIDO == null ? '' : element.PRIMER_APELLIDO;

    return {...element, NAME: element.PRIMER_NOMBRE + ' ' + lastname}
})

export const getShareholderDocumentListDropdown = (state: State) => state.shareholderList?.shareholderList?.map(element => ({...element, DOCUMENT: element.IDENTIFICACION}))

export const getShareholderTipeDocDropdown = (state: State) => state.shareholderList?.shareholderList?.map(element => ({...element, TYPEDOC: element.TIPO_DOCUMENTO}))
