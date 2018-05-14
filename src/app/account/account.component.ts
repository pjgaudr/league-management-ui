import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../_services/league.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  model: any = {};
  gameModel: any = {};
  
  allLeagues = [];
  allLeaguesSubscription;

  leagues = [];
  leaguesSubscription;

  user;

  loading = false;

  constructor(private leagueService: LeagueService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.allLeaguesSubscription = this.leagueService.allLeaguesChanged.subscribe(
      (leagues) => {
        this.allLeagues = leagues;
      }
    );

    this.leaguesSubscription = this.leagueService.leaguesChanged.subscribe(
      (leagues) => {
        this.leagues = leagues;
      }
    );

    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  requestToJoin() {
    this.loading = true;
    this.leagueService.requestToJoin(this.model.leagueId, this.model.subscription)
    .subscribe(
        data => {
            this.snackBar.open("Request to join league " + this.model.leagueId + " sent", 'Ok', {duration: 3000});            
            this.loading = false;
        },
        error => {
            this.snackBar.open("ERROR - Request to join " + this.model.leagueId + " failed", 'Ok', {duration: 3000});            
            this.loading = false;
        });
  }
}
