import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { PublicationResponse } from '../../interfaces/publications/publication.interface';
import { PublicationModel } from '../../model/publications/publication.model';

export const publicationResponseToPublicationModel = (pu: PublicationResponse): PublicationModel => {
  return {
    ...pu,
  };
};

@Injectable({
  providedIn: 'root',
})
export class PublicationService {
  constructor(private http: HttpClient) {}

  getPublications(idDataset: string): Observable<PublicationResponse[]> {
    let endPoint = `${environment.SIMEM_ADMIN_URL}${'Publication/Records?idDataset='}${idDataset}`;
    return this.http.get<PublicationResponse[]>(endPoint);
  }

  savePublication(publicationInformation: PublicationModel) {
    let endPoint = `${environment.SIMEM_ADMIN_URL}${'Publication/Add'}`;
    return this.http.post(endPoint, publicationInformation, {responseType: 'text'});
  }

  updatePublication(publicationInformation: PublicationModel) {
    let endPoint = `${environment.SIMEM_ADMIN_URL}${'Publication/Update'}`;
    return this.http.put(endPoint, publicationInformation, {responseType: 'text'});
  }

  deletePublication(idPublicacionRegulatoria: string) {
    let endPoint = `${environment.SIMEM_ADMIN_URL}${'Publication/Remove?idPublicacionRegulatoria='}${idPublicacionRegulatoria}`;
    return this.http.delete(endPoint, { responseType: 'text'});
  }
}
