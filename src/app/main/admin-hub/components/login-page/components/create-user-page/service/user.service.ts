import { UserData } from './../../../../../models/user-model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  public postUser(user: UserData): Observable<any[]> {
    return this.http.post<UserData[]>(`${environment.apiRootUrl}/api/User`, user, this.httpOptions)
  }
  
}
