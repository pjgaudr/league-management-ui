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
  
  leagues = [];
  subscription;

  loading = false;

  constructor(private leagueService: LeagueService) { }

  ngOnInit() {
    this.leagues = this.leagueService.getLeagues();
    this.subscription = this.leagueService.leaguesChanged.subscribe(
      () => {
        this.leagues = this.leagueService.getLeagues();
      }
    );
  }

  requestToJoin() {
    this.loading = true;
    
  }

}
