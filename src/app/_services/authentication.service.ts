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
    
        return this.http.get(authenticateUrl + "?email=" + username, requestOptions)
          .map(
            (response: Response) => {
                if(response.status == 200)
                {
                  console.log("Login successfull as " + username);
                  var jwt = response.text();
                  var user: any = this.decodeToken(jwt);
                  console.log(user);
                  user.jwt = jwt;
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  return user;
                }
                else
                {
                  console.error("Forbidden access to " + username);
                }
            }
          );
    }
    
    decodeToken(token) : any {
      var payload = JSON.parse(atob(token.split('.')[1]));
      return payload;    
    };

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}