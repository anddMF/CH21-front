import { ArcProfile } from './../models/arc-profile';
import { Report } from './../../choices-hub/models/report';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RoomType } from '../../customer-home/models/room-type';

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
      retry(1),
      tap(_ => console.log('GET report')),
      catchError(this.handleError<any>('getReport'))
    );
  }

  // Se repete na customer service e aqui
  public getRoom(): Observable<RoomType[]> {
    return this.http.get<RoomType[]>(`${environment.apiRootUrl}/api/Customer/room`).pipe(
      retry(1),
      tap(_ => console.log('GET room')),
      catchError(this.handleError<any>('getRoom'))
    )
  }

  public getArcProfile(): Observable<ArcProfile[]> {
    return this.http.get<ArcProfile[]>(`${environment.apiRootUrl}/api/Image/arcprofile`).pipe(
      retry(1),
      tap(_=> console.log('GET arcprofile')),
      catchError(this.handleError<any>('getArcProfile'))
    )
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
