import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../_services/league.service';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-league-mgt',
  templateUrl: './league-mgt.component.html',
  styleUrls: ['./league-mgt.component.css']
})
export class LeagueMgtComponent implements OnInit {
  model: any = {};
  gameModel: any = {};
  deleteModel: any = {};
  
  leagues = [];
  subscription;

  allLeagues = [];
  allLeaguesSubscription;

  leagueRequests = [];

  loading = false;
  gameLoading = false;
  deleteLoading = false;
  startDate = new Date(2018, 8, 1);

  requestsDisplayedColumns = ['name', 'email', 'position', 'subscription', 'button'];
  requestsDataSource;
  
  constructor(private leagueService: LeagueService,
              public snackBar: MatSnackBar,
              private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.allLeagues = this.leagueService.getAllLeagues();
    this.allLeaguesSubscription = this.leagueService.allLeaguesChanged.subscribe(
      () => {
        this.allLeagues = this.leagueService.getAllLeagues();
      }
    );

    this.subscription = this.leagueService.leaguesChanged.subscribe(
      (leagues) => {
        this.leagues = leagues;

        if(this.leagues.length > 0)
        {
          this.leagueService.getLeagueRequests(this.appComponent.getSelectedLeague())
          .subscribe(
            data => {
              this.leagueRequests = data;
              this.requestsDataSource = new MatTableDataSource(this.leagueRequests);
            }
          );
        }
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

  deleteLeague() {
    //TODO: implement this method!
    // this.deleteLoading = true;
    // this.leagueService.deleteLeague(this.deleteModel.leagueId);
  }

  acceptRequest(request) {
    //TODO: implement this method!
  }

  refuseRequest(request) {
    //TODO: implement this method!
  }
}
