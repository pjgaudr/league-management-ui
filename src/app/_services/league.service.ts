import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';
import { catchError, retry } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpErrorHandlingHelper } from '../_helpers/http.error.handling';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface League {
  id: number,
  name: string
};

@Injectable()
export class LeagueService {

  private leaguesUrl = 'http://localhost:8080/leagues';  // URL to web api

  private leagues = [];
  leaguesChanged = new BehaviorSubject<League[]>(this.leagues);

  private allLeagues = [];
  allLeaguesChanged = new BehaviorSubject<League[]>(this.allLeagues);

  constructor(
    private httpClient: HttpClient,
    private errorHelper: HttpErrorHandlingHelper) {
    }
    
  getLeague(id): any {
    var league = this.leagues.find(league => league.id == id);
    return league;
  }

  initialize() {
    var user = JSON.parse(localStorage.getItem('currentUser'));
    if(user)
    {
      this.fetchLeagues(user);
      this.fetchAllLeagues();
    }
  }

  fetchLeagues(user:any)  {
    var fetchUrl = this.leaguesUrl + "?playerId=" + user.sub;

    this.httpClient.get<League[]>(fetchUrl)
      .subscribe(
        data => {
            this.leagues = data;
            this.leaguesChanged.next(data);
        },
        err => {
            console.error(err);
        }
    );
  }
  
  fetchAllLeagues()  {
    this.httpClient.get<League[]>(this.leaguesUrl)
      .subscribe(
        data => {
            this.allLeagues = data;
            this.allLeaguesChanged.next(data);
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
                            + user.sub + "?subscription=" + subscription;

    return this.httpClient.post(requestToJoinUrl, '{}').pipe(
      catchError(error => this.errorHelper.handleError(error))
    );
  }

  getLeagueRequests(leagueId): any {
    var leagueRequestsUrl = "http://localhost:8080/leagues/" + leagueId + "/requests";
    return this.httpClient.get(leagueRequestsUrl).pipe(
      catchError(error => this.errorHelper.handleError(error))
    );
  }

  logout() {
    this.leagues = [];
    this.allLeagues = [];
  }
}
