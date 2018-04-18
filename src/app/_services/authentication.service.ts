import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Http, Headers, Response } from '@angular/http';
declare var KJUR:any;

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    validatePublicKey() {
      var publicKeyUrl = "http://localhost:8080/auth/publicKey";

      return this.http.get(publicKeyUrl)
      .map(
        (response: Response) => {
            if(response.status == 200)
            {
              var pubkey = response.text();
              console.log(pubkey);
              var user = JSON.parse(localStorage.getItem('currentUser'));        

              return KJUR.jws.JWS.verifyJWT(user.jwt, pubkey, {alg: ['RS256']});
            }
            else
            {
              console.error("Unable to retrieve public key.  Status is: " + response.status);
            }
        }
      );
    }

    login(username: string, password: string) {
        var authenticateUrl = "http://localhost:8080/auth/login";
        var auth = window.btoa(username + ":" + password);

        const headerDict = {
          "Authorization": "Basic " + auth,
          'accept': 'text/plain' 
        }
        
        const requestOptions = {                                                                                                                                                                                 
          headers: new Headers(headerDict), 
          withCredentials: true
        };
    
        return this.http.get(authenticateUrl, requestOptions)
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

                  this.validatePublicKey()
                  .subscribe(
                      data => {
                        if(data) { console.log("Public key validated sucessfully"); }
                        else     { console.error("Invalid public key"); }
                      },
                      error => {
                          console.error(error);
                      }
                  )          
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