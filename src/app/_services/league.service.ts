import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LeagueService {

  private leaguesUrl = 'http://localhost:8080/leagues';  // URL to web api

  private leagues = [];
  private leaguesInitialized = false;
  private leaguesLoading = false;
  leaguesChanged = new Subject<void>();

  private allLeagues = [];
  private allLeaguesInitialized = false;
  private allLeaguesLoading = false;
  allLeaguesChanged = new Subject<void>();

  constructor(
    private http: Http) {

    }
    
  getLeagues() {
    if(!this.leaguesInitialized && !this.leaguesLoading)
    {
      this.fetchLeagues();
    }
      
    return this.leagues.slice();
  }
    
  getAllLeagues() {
    if(!this.allLeaguesInitialized && !this.allLeaguesLoading)
    {
      this.fetchAllLeagues();
    }
      
    return this.allLeagues.slice();
  }
    
  getLeague(id): any {
    var league = this.leagues.find(league => league.id == id);
    // this.setSelectedLeague(league);
    return league;
  }

  fetchLeagues()  {
    this.leaguesLoading = true;
    var user = JSON.parse(localStorage.getItem('currentUser'));

    const headerDict = {
      "Authorization": "Basic " + user.auth,
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
      withCredentials: true
    };

    var fetchUrl = this.leaguesUrl + "?playerId=" + user.id;
    console.log(fetchUrl);

    this.http.get(fetchUrl, requestOptions)
      .map(
        (response: Response) => {
            return response.json();
        }
      )
      .subscribe(
        (data) => {
            this.leaguesLoading = false;
            this.leaguesInitialized = true;
            this.leagues = data;
            console.log('Fetched from server: ');
            console.log(this.leagues);
            this.leaguesChanged.next();
        }
    );
  }
  
  fetchAllLeagues()  {
    this.allLeaguesLoading = true;
    var user = JSON.parse(localStorage.getItem('currentUser'));

    const headerDict = {
      "Authorization": "Basic " + user.auth,
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
            this.allLeaguesLoading = false;
            this.allLeaguesInitialized = true;
            this.allLeagues = data;
            console.log('Fetched from server: ');
            console.log(this.allLeagues);
            this.allLeaguesChanged.next();
        }
    );
  }

  createLeague(leagueName: String) {
    var authenticateUrl = "http://localhost:8080/leagues?leagueName=" + leagueName;
    var user = JSON.parse(localStorage.getItem('currentUser'));

    const headerDict = {
      "Authorization": "Basic " + user.auth,
      'Content-Type': 'application/json' 
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
      withCredentials: true
    };

    return this.http.post(authenticateUrl, '{}', requestOptions)
      .map(
        (response: Response) => {
            if(response.status == 201)
            {
              console.log("League " + leagueName + " created successfully");
            }
            else
            {
              console.error("Could not create league " + leagueName);
            }

            return response.json();
        }
      );
  }

  logout() {
    this.leagues = [];
    this.leaguesInitialized = false;
    this.allLeagues = [];
    this.allLeaguesInitialized = false;
  }

  // private selectedLeague;
  // selectedLeagueChanged = new Subject<void>();
  
  // setSelectedLeague(league) {
  //   this.selectedLeague = league;
  //   this.selectedLeagueChanged.next();
  // }

  // getSelectedLeague() {
  //   return this.selectedLeague;
  // }

  // getDefaultLeague(): any {
  //   return this.leagues[0];
  // }
}
