import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { viewFormInterface } from 'src/app/model/viewForm.model';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ShareholderharedDataService {

  private dataInterface: viewFormInterface = {
    viewForm: null,
    task: null
  };

  private data = new BehaviorSubject<viewFormInterface>(this.dataInterface);
  private dataShareholderEdit = new BehaviorSubject<string>(null);

  constructor() { }

  // get y set del tipo de vista
  setData(value: boolean, task: string) {

    this.dataInterface = {
      viewForm: value,
      task: task
    }

    const jsonString = JSON.stringify(this.dataInterface);
    const encryptedData = CryptoJS.AES.encrypt(jsonString, environment.secretKey).toString();
    localStorage.setItem('shareholderDataInterface', encryptedData);
    this.data.next(this.dataInterface);
  }

  getData() {

    if (localStorage.getItem('shareholderDataInterface')) {
      const encryptedDataFromLocalStorage = localStorage.getItem('shareholderDataInterface');

      // Descifrar la cadena cifrada utilizando la clave secreta
      const decryptedData = CryptoJS.AES.decrypt(encryptedDataFromLocalStorage, environment.secretKey);
      // Convertir la cadena descifrada en un objeto JSON
      const decryptedDataAsString = decryptedData.toString(CryptoJS.enc.Utf8);
      const decryptedObject = JSON.parse(decryptedDataAsString);

      this.data.next(decryptedObject);
    }

    return this.data.asObservable();

  }

  // envio de datos
  setIdShareholder(idShareholder: string) {
    const jsonString = JSON.stringify(idShareholder);
    const encryptedData = CryptoJS.AES.encrypt(jsonString, environment.secretKey).toString();
    localStorage.setItem('dataShareholderEdit', encryptedData);
    this.dataShareholderEdit.next(idShareholder);
  }

  getIdShareholder() {
    const encryptedDataFromLocalStorage = localStorage.getItem('dataShareholderEdit');
    const decryptedData = CryptoJS.AES.decrypt(encryptedDataFromLocalStorage, environment.secretKey);
    const decryptedDataAsString = decryptedData.toString(CryptoJS.enc.Utf8);
    const decryptedObject = JSON.parse(decryptedDataAsString);
    this.dataShareholderEdit.next(decryptedObject);
    return this.dataShareholderEdit.asObservable();
  }

}
