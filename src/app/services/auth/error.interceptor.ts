import { AuthenticationService } from './authentication.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) { }

    // Intercepta respostas HTTP para verificar se o user pode estar deslogado
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(err => {
            if(err.status === 401 ){
                this.authService.logout();
                location.reload(true);
            }

            const error = err.error.message || err.StatusText;
            return throwError(error);
        }))
    }

}