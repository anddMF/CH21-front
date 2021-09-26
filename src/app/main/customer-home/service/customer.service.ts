import { Report } from './../../choices-hub/models/report';
import { Customer } from './../models/customer';
import { Company } from './../models/company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RoomType } from '../models/room-type';
import { WorkerUser } from '../models/worker';
import { ImageFile } from '../../choices-hub/components/image-gallery/models/image-file';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  public getCompany(): Observable<Company[]> {
    return this.http.get<Company[]>(`${environment.apiRootUrl}/api/Customer/company`).pipe(
      retry(2),
      tap(_ => console.log('GET company')),
      catchError(this.handleError<any>('getCompany'))
    )
  }

  public getWorker(companyId: number): Observable<WorkerUser[]> {
    return this.http.get<WorkerUser[]>(`${environment.apiRootUrl}/api/User?id_company=${companyId}`).pipe(
      retry(2),
      tap(_ => console.log('GET worker')),
      catchError(this.handleError<any>('getWorker'))
    )
  }

  public getRoom(): Observable<RoomType[]> {
    return this.http.get<RoomType[]>(`${environment.apiRootUrl}/api/Customer/room`).pipe(
      retry(2),
      tap(_ => console.log('GET room')),
      catchError(this.handleError<any>('getRoom'))
    )
  }

  public getImages(): Observable<ImageFile[]> {
    return this.http.get<ImageFile[]>(`${environment.apiRootUrl}/api/Image`).pipe(
      retry(2),
      tap(_ => console.log('GET images')),
      catchError(this.handleError<any>('getImages'))
    )
  }

  public getImagesById(listIds: string[]): Observable<ImageFile[]> {
    let param = "";
    for (let index = 0; index < listIds.length; index++) {
      if(index === 0)
        param = "list="+listIds[index];
      else
        param += "&list="+listIds[index];
    }
    console.log(param)
    return this.http.get<ImageFile[]>(`${environment.apiRootUrl}/api/Image/id?${param}`).pipe(
      retry(2),
      tap(_ => console.log('GET images')),
      catchError(this.handleError<any>('getImages'))
    )
  }

  public postCustomer(customer: Customer): Observable<Customer[]> {
    return this.http.post<Customer[]>(`${environment.apiRootUrl}/api/Customer`, customer, this.httpOptions)
  }

  public postReport(report: Report): Observable<Report[]> {
    console.log('POST report', report)
    return this.http.post<Report[]>(`${environment.apiRootUrl}/api/Report`, report, this.httpOptions)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //TODO: enviar erro para serviço de log
      console.error(error);
      // console.log(`${operation} failed: ${error.message}`);

      // return of(result as T);
      return of()
    }
  }
}
