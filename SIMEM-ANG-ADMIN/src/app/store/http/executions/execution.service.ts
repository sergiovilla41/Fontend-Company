import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ExecutionResponse } from '../../interfaces/executions/execution.interface';
import { ExecutionModel } from '../../model/executions/execution.model';

export const executionResponseToExecutionModel = (ex: ExecutionResponse): ExecutionModel => {
  return {
    ...ex,
  };
};

@Injectable({
  providedIn: 'root',
})
export class ExecutionService {
  constructor(private http: HttpClient) {}

  getExecutions(idDataset: string): Observable<ExecutionResponse[]> {
    let endPoint = `${environment.SIMEM_ADMIN_URL}${'Execution/Records?idDataset='}${idDataset}`;
    return this.http.get<ExecutionResponse[]>(endPoint);
  }

  saveExecution(executionInformation: ExecutionModel) {
    let endPoint = `${environment.SIMEM_ADMIN_URL}${'Execution/Add'}`;
    return this.http.post(endPoint, executionInformation, {
      responseType: 'text',
    });
  }

  updateExecution(executionInformation: ExecutionModel) {
    let endPoint = `${environment.SIMEM_ADMIN_URL}${'Execution/Update'}`;
    return this.http.put(endPoint, executionInformation, {
      responseType: 'text',
    });
  }

  deleteExecution(idEjecucion: string) {
    let endPoint = `${environment.SIMEM_ADMIN_URL}${'Execution/Remove?idEjecucion='}${idEjecucion}`;
    return this.http.delete(endPoint, { responseType: 'text' });
  }
}
