import { AuthenticationService } from './authentication.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService, private router: Router) { }

    // Intercepta respostas HTTP para verificar se o user pode estar deslogado
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    // captura um erro client side no if e server side no else
                    if (error.error instanceof ErrorEvent) {
                        errorMsg = `Error: ${error.error.message}`;
                    }
                    else {
                        console.log('obj erro: ', error)
                        errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                        if (error.status === 401) {
                            this.authService.logout();
                            // location.reload(true);
                            this.router.navigate(['login'])
                        }
                    }
                    console.log(errorMsg);
                    return throwError(error);
                })
            )
    }
}