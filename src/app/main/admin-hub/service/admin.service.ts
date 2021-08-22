import { Report } from './../../choices-hub/models/report';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  // Em teste
  public getReports(idCompany: number): Observable<Report[]> {
    return this.http.get<Report[]>(`${environment.apiRootUrl}/guard/Report?id_company=${idCompany}`).pipe(
      retry(2),
      tap(_ => console.log('GET report')),
      catchError(this.handleError<any>('getReport'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //TODO: enviar erro para serviço de log
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
}
