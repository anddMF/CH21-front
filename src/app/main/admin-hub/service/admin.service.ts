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
  public getReports(idCompany: number, idCustomer: number = 0): Observable<Report[]> {
    // return this.http.get<Report[]>(`${environment.apiRootUrl}/api/Report/customer?id_company=${idCompany}&id_customer=${idCustomer}`).pipe(
    //   retry(2),
    //   tap(_ => console.log('GET report')),
    //   catchError(this.handleError<any>('getReport'))
    // )

    return of([  {
      "id": 4,
      "id_customer": 2,
      "id_user_admin": 0,
      "id_user_worker": 0,
      "id_company": 0,
      "dt_register": new Date("2021-04-02T17:05:42"),
      "deal": true,
      "r_read": false,
      "title": "teste te",
      "r_description": "testestestes",
      "r_key": "",
      "r1_pic1": 1,
      "r1_pic2": 2,
      "r2_pic1": 0,
      "r2_pic2": 0,
      "r3_pic1": 0,
      "r3_pic2": 0,
      "r4_pic1": 0,
      "r4_pic2": 0,
      "r5_pic1": 0,
      "r5_pic2": 0,
      "r6_pic1": 0,
      "r6_pic2": 0,
      "r7_pic1": 0,
      "r7_pic2": 0,
      "r8_pic1": 0,
      "r8_pic2": 0,
      "name": "Testando",
      "dt_birth": new Date("1998-08-04T00:00:00"),
      "children": 0,
      "kid": false,
      "email": "teste@email.com"
    },
    {
      "id": 5,
      "id_customer": 3,
      "id_user_admin": 0,
      "id_user_worker": 0,
      "id_company": 0,
      "dt_register": new Date("2021-04-02T17:05:42"),
      "deal": true,
      "r_read": false,
      "title": "teste te",
      "r_description": "testestestes",
      "r_key": "",
      "r1_pic1": 1,
      "r1_pic2": 2,
      "r2_pic1": 0,
      "r2_pic2": 0,
      "r3_pic1": 0,
      "r3_pic2": 0,
      "r4_pic1": 0,
      "r4_pic2": 0,
      "r5_pic1": 0,
      "r5_pic2": 0,
      "r6_pic1": 0,
      "r6_pic2": 0,
      "r7_pic1": 0,
      "r7_pic2": 0,
      "r8_pic1": 0,
      "r8_pic2": 0,
      "name": "Arnaldo",
      "dt_birth": new Date("1998-08-04T00:00:00"),
      "children": 0,
      "kid": false,
      "email": "teste@email.com"
    }])
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
