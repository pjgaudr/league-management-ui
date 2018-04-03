import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    createUser(model: any) {
        // http://localhost:8080/players?firstName=Patrick&lastName=Gaudreau&email=patrick.gaudreau%40nnhl.com&password=passw0rd&position=FORWARD
        var playersUrl = "http://localhost:8080/players?firstName=" + model.firstName +
            "&lastName=" + model.lastName + "&email=" + model.username + "&password=" + model.password + 
            "&position=" + model.position;

        const headerDict = {
          'Content-Type': 'application/json' 
        }
        
        const requestOptions = {                                                                                                                                                                                 
          headers: new Headers(headerDict), 
        };
    
        return this.http.post(playersUrl, '{}', requestOptions)
        .map(
            (response: Response) => {
                return response.json();
            }
          )    
    }
}
