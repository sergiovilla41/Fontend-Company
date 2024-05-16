import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { viewFormInterface } from 'src/app/model/viewForm.model';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UserSharedDataService {

  private dataInterface: viewFormInterface = {
    viewForm: null,
    task: null
  };

  private data = new BehaviorSubject<viewFormInterface>(this.dataInterface);
  private dataUserEdit = new BehaviorSubject<number>(null);

  constructor() { }

  // get y set del tipo de vista
  setData(value: boolean, task: string) {

    this.dataInterface = {
      viewForm: value,
      task: task
    }

    const jsonString = JSON.stringify(this.dataInterface);
    const encryptedData = CryptoJS.AES.encrypt(jsonString, environment.secretKey).toString();
    localStorage.setItem('dataInterface', encryptedData);
    this.data.next(this.dataInterface);
  }

  getData() {

    if (localStorage.getItem('dataInterface')) {
      const encryptedDataFromLocalStorage = localStorage.getItem('dataInterface');

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
  setIdUser(idUser: number) {
    localStorage.setItem('dataEdit', JSON.stringify(idUser));
    this.dataUserEdit.next(idUser);
  }

  getIdUser() {
    let idUser = parseInt(localStorage.getItem("dataEdit"));
    this.dataUserEdit.next(idUser);
    return this.dataUserEdit.asObservable();
  }

}
