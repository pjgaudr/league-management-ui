import { Injectable } from "@angular/core";
import { catchError, retry } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class PlayerService {
    constructor(private httpClient: HttpClient) { }

    createPlayer(model: any) {
        var playersUrl = "http://localhost:8080/players?firstName=" + model.firstName +
            "&lastName=" + model.lastName + "&email=" + model.username + "&password=" + model.password + 
            "&position=" + model.position;

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
            })
        };

        return this.httpClient.post(playersUrl, '{}', httpOptions).pipe(
            catchError(this.handleError)
        );                         
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was:`);
          console.error(error.error);  
        }
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable (
          'Something bad happened; please try again later.');
    };        
}
