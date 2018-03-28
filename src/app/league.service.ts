import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LeagueService {

  private leaguesUrl = 'http://localhost:8080/leagues';  // URL to web api

  private leagues = [
    { id: 1, name: 'FakeLeague1' },
    { id: 2, name: 'FakeLeague2' }
  ];

  leaguesChanged = new Subject<void>();

  constructor(
    private http: Http) {

    }

  getLeagues() {
    return this.leagues.slice();
  }
    
  fetchLeagues()  {
    this.http.get(this.leaguesUrl)
      .map(
        (response: Response) => {
            return response.json();
        }
      )
      .subscribe(
        (data) => {
            this.leagues = data;
            console.log('Fetched from server: ');
            console.log(this.leagues);
            this.leaguesChanged.next();
        }
    );
  } 
}
