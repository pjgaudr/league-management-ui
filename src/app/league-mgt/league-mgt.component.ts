import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../_services/league.service';
import {MatSnackBar} from '@angular/material';

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

  constructor(private leagueService: LeagueService,
              public snackBar: MatSnackBar) { }

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
                this.snackBar.open('League ' + this.model.leagueName + ' created successfully', 'Ok', {duration: 3000});            
                this.loading = false;
            },
            error => {
                this.snackBar.open('ERROR - Could not create league ' + this.model.leagueName, 'Ok', {duration: 3000});            
                this.loading = false;
            });
  }

  createGames() {
    this.gameLoading = true;
    this.leagueService.createGames(this.gameModel.leagueId, this.gameModel.startDate, this.gameModel.numberOfGames)
        .subscribe(
            data => {
                this.snackBar.open(this.model.numberOfGames + ' games created successfully', 'Ok', {duration: 3000});            
                this.gameLoading = false;
            },
            error => {
                this.snackBar.open('ERROR - Could not create games', 'Ok', {duration: 3000});            
                this.gameLoading = false;
            });
  }
}
