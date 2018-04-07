import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';
import { catchError, retry } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpErrorHandlingHelper } from '../_helpers/http.error.handling';

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
    private httpClient: HttpClient,
    private errorHelper: HttpErrorHandlingHelper) {
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
      catchError(error => this.errorHelper.handleError(error))
    );
  }

  createGames(leagueId, startDate, numberOfGames): any {
    var formatedDate = moment(startDate).format('YYYY-MM-DD');
    var newSeasonUrl = "http://localhost:8080/games/newseason?leagueId=" + leagueId +
                          "&startDate=" + formatedDate + "&numberOfGames=" + numberOfGames;

    return this.httpClient.post(newSeasonUrl, '{}').pipe(
      catchError(error => this.errorHelper.handleError(error))
    );
  }
  
  requestToJoin(leagueId, subscription): any {    
    var user = JSON.parse(localStorage.getItem('currentUser'));
    var requestToJoinUrl = "http://localhost:8080/leagues/" + leagueId + "/requests/" 
                            + user.id + "?subscription=" + subscription;

    return this.httpClient.post(requestToJoinUrl, '{}').pipe(
      catchError(error => this.errorHelper.handleError(error))
    );
  }

  logout() {
    this.leagues = [];
    this.leaguesInitialized = false;
    this.allLeagues = [];
    this.allLeaguesInitialized = false;
  }
}
