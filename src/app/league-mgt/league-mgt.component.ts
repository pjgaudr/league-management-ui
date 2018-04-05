import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../_services/league.service';

@Component({
  selector: 'app-league-mgt',
  templateUrl: './league-mgt.component.html',
  styleUrls: ['./league-mgt.component.css']
})
export class LeagueMgtComponent implements OnInit {
  model: any = {};
  gameModel: any = {};
  
  leagues = [];
  subscription;

  loading = false;
  gameLoading = false;
  startDate = new Date(2018, 8, 1);

  constructor(private leagueService: LeagueService) { }

  ngOnInit() {
    this.leagues = this.leagueService.getLeagues();
    this.subscription = this.leagueService.leaguesChanged.subscribe(
      () => {
        this.leagues = this.leagueService.getLeagues();
      }
    );
  }

  createLeague() {
    this.loading = true;
    this.leagueService.createLeague(this.model.leagueName)
        .subscribe(
            data => {
                //this.alertService.success('Registration successful', true);
                console.log('League created successfully');
                this.loading = false;
            },
            error => {
                //this.alertService.error(error);
                console.error(error);
                this.loading = false;
            });
  }

  createGames() {
    // TODO: call the /games/newseason REST call
    this.gameLoading = true;
    console.log(this.gameModel);
    this.gameLoading = false;
  }
}
