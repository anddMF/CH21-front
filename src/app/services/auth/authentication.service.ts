import { User } from './../../main/admin-hub/models/user-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    const userStorage = sessionStorage.getItem('currentUser');
    console.log('user storage', userStorage);

    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(userStorage === null ? '' : userStorage));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiGuardRootUrl}/login`, { email, password })
      .pipe(map(user => {
        if (user && user.token) {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  public logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
