import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';
import { catchError, retry } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

export interface League {
  id: number,
  name: string
};

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
    private httpClient: HttpClient) {
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
    return league;
  }

  fetchLeagues()  {
    this.leaguesLoading = true;
    var user = JSON.parse(localStorage.getItem('currentUser'));

    var fetchUrl = this.leaguesUrl + "?playerId=" + user.id;

    this.httpClient.get<League[]>(fetchUrl)
      .subscribe(
        data => {
            this.leaguesLoading = false;
            this.leagues = data;
            this.leaguesInitialized = true;
            this.leaguesChanged.next();
        },
        err => {
            console.error(err);
        }
    );
  }
  
  fetchAllLeagues()  {
    this.allLeaguesLoading = true;
    this.httpClient.get<League[]>(this.leaguesUrl)
      .subscribe(
        data => {
            this.allLeaguesLoading = false;
            this.allLeagues = data;
            this.allLeaguesInitialized = true;
            this.allLeaguesChanged.next();
        },
        err => {
            console.error(err);
        }
      );
  }

  createLeague(leagueName: String) {
    var authenticateUrl = "http://localhost:8080/leagues?leagueName=" + leagueName;

    return this.httpClient.post(authenticateUrl, '{}').pipe(
      catchError(this.handleError)
    );
  }

  createGames(leagueId, startDate, numberOfGames): any {
    var formatedDate = moment(startDate).format('YYYY-MM-DD');
    var newSeasonUrl = "http://localhost:8080/games/newseason?leagueId=" + leagueId +
                          "&startDate=" + formatedDate + "&numberOfGames=" + numberOfGames;

    return this.httpClient.post(newSeasonUrl, '{}').pipe(
      catchError(this.handleError)
    );
  }
  
  requestToJoin(leagueId, subscription): any {    
    var user = JSON.parse(localStorage.getItem('currentUser'));
    var requestToJoinUrl = "http://localhost:8080/leagues/" + leagueId + "/requests/" 
                            + user.id + "?subscription=" + subscription;

    return this.httpClient.post(requestToJoinUrl, '{}').pipe(
      catchError(this.handleError)
    );
  }

  logout() {
    this.leagues = [];
    this.leaguesInitialized = false;
    this.allLeagues = [];
    this.allLeaguesInitialized = false;
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
