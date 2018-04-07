import { Injectable } from "@angular/core";
import { catchError, retry } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpErrorHandlingHelper } from "../_helpers/http.error.handling";

@Injectable()
export class PlayerService {
    constructor(private httpClient: HttpClient,
                private errorHelper: HttpErrorHandlingHelper) { }

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
            catchError(error => this.errorHelper.handleError(error))
        );                         
    }
}
