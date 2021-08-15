import { AuthenticationService } from './authentication.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('CAIU INTERCEPTOR')
        console.log('URL: ', req.url)
        const currentUser = this.authService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.token;
        const isUrlGuard = req.url.startsWith(`${environment.apiRootUrl}/guard`);
        if (isLoggedIn && isUrlGuard) {
            console.log('entrou isLoggedIn', currentUser)
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(req);
    }

}