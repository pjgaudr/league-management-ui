import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        var authenticateUrl = "http://localhost:8080/auth/login";
        var auth = window.btoa(username + ":" + password);

        const headerDict = {
          "Authorization": "Basic " + auth,
          'Content-Type': 'application/json' 
        }
        
        const requestOptions = {                                                                                                                                                                                 
          headers: new Headers(headerDict), 
          withCredentials: true
        };
    
        return this.http.post(authenticateUrl + "?email=" + username, '{}', requestOptions)
          .map(
            (response: Response) => {
                if(response.status == 200)
                {
                  console.log("Login successfull as " + username);
                  var user = response.json();
                  user.auth = auth;
                  console.log(user);
                  localStorage.setItem('currentUser', JSON.stringify(user));
                }
                else
                {
                  console.error("Forbidden access to " + username);
                }

                return response.json();
            }
          );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}