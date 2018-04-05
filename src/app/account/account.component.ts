import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../_services/league.service';

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

  constructor(private leagueService: LeagueService) { }

  ngOnInit() {
    this.allLeagues = this.leagueService.getAllLeagues();
    this.allLeaguesSubscription = this.leagueService.allLeaguesChanged.subscribe(
      () => {
        this.allLeagues = this.leagueService.getAllLeagues();
      }
    );

    this.leagues = this.leagueService.getLeagues();
    this.leaguesSubscription = this.leagueService.leaguesChanged.subscribe(
      () => {
        this.leagues = this.leagueService.getLeagues();
      }
    );

    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  requestToJoin() {
    this.loading = true;
    
  }

}
