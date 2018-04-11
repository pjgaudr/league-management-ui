import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with the currentUser token if available
        let user = JSON.parse(localStorage.getItem('currentUser'));        

        if (user) {
            request = request.clone({
                setHeaders: { 
                    "Authorization": "Bearer " + user.jwt,
                    'Content-Type': 'application/json'                       
                },
                withCredentials: true
            });
        }

        return next.handle(request);
    }
}