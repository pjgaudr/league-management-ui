import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LeagueService {

  private leaguesUrl = 'http://localhost:8080/leagues';  // URL to web api

  private leagues = [];
  private selectedLeague;

  leaguesChanged = new Subject<void>();
  selectedLeagueChanged = new Subject<void>();

  constructor(
    private http: Http) {

    }

  setSelectedLeague(league) {
    this.selectedLeague = league;
    this.selectedLeagueChanged.next();
  }

  getSelectedLeague() {
    return this.selectedLeague;
  }

  getLeagues() {
    return this.leagues.slice();
  }
    
  getLeague(id): any {
    var league = this.leagues.find(league => league.id == id);
    this.setSelectedLeague(league);
    return league;
  }

  fetchLeagues()  {
    var auth = localStorage.getItem('currentUser');

    const headerDict = {
      "Authorization": "Basic " + auth,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
      withCredentials: true
    };

    this.http.get(this.leaguesUrl, requestOptions)
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
