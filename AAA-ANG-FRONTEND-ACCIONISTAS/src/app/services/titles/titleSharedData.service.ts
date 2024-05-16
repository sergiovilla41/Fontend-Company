import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { viewFormInterface } from 'src/app/model/viewForm.model';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { Titles } from 'src/app/model/titles.model';

@Injectable({
  providedIn: 'root'
})
export class TitleSharedDataService {

  private dataInterface: viewFormInterface = {
    viewForm: null,
    task: null
  };

  private data = new BehaviorSubject<viewFormInterface>(this.dataInterface);
  private dataTitleEdit = new BehaviorSubject<string>(null);
  private dataCancelTitle = new BehaviorSubject<Titles[]>(null);
  private editingTitle = new BehaviorSubject<Titles>(JSON.parse(localStorage.getItem('editingTitle')));

  constructor() { }

  // get y set del tipo de vista
  getEditingTitle(){
    return this.editingTitle.asObservable()
  }

  setEditingTitle(title: Titles){
    this.editingTitle.next(title)
    localStorage.setItem('editingTitle', JSON.stringify(title))
  }

  setData(value: boolean, task: string) {

    this.dataInterface = {
      viewForm: value,
      task: task
    }

    const jsonString = JSON.stringify(this.dataInterface);
    const encryptedData = CryptoJS.AES.encrypt(jsonString, environment.secretKey).toString();
    localStorage.setItem('titleDataInterface', encryptedData);
    this.data.next(this.dataInterface);
  }

  getData() {

    if (localStorage.getItem('titleDataInterface')) {
      const encryptedDataFromLocalStorage = localStorage.getItem('titleDataInterface');

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
  setIdTitle(idTitle: string) {
    const jsonString = JSON.stringify(idTitle);
    const encryptedData = CryptoJS.AES.encrypt(jsonString, environment.secretKey).toString();
    localStorage.setItem('dataTitleEdit', encryptedData);
    this.dataTitleEdit.next(idTitle);
  }

  getIdTitle() {
    const encryptedDataFromLocalStorage = localStorage.getItem('dataTitleEdit');
    const decryptedData = CryptoJS.AES.decrypt(encryptedDataFromLocalStorage, environment.secretKey);
    const decryptedDataAsString = decryptedData.toString(CryptoJS.enc.Utf8);
    const decryptedObject = JSON.parse(decryptedDataAsString);
    this.dataTitleEdit.next(decryptedObject);
    return this.dataTitleEdit.asObservable();
  }


  // anulacion de titulos
  setCancelTitle(titles: Titles[]) {
    const jsonString = JSON.stringify(titles);
    const encryptedData = CryptoJS.AES.encrypt(jsonString, environment.secretKey).toString();
    localStorage.setItem('dataCancelTitle', encryptedData);
    this.dataCancelTitle.next(titles);
  }

  getCancelTitle() {
    const encryptedDataFromLocalStorage = localStorage.getItem('dataCancelTitle');
    const decryptedData = CryptoJS.AES.decrypt(encryptedDataFromLocalStorage, environment.secretKey);
    const decryptedDataAsString = decryptedData.toString(CryptoJS.enc.Utf8);
    const decryptedObject = JSON.parse(decryptedDataAsString);
    this.dataCancelTitle.next(decryptedObject);
    return this.dataCancelTitle.asObservable();
  }
}
