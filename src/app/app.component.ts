import { Component, OnInit, Injectable } from '@angular/core';
import { LeagueService } from './league.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit {
  title = 'the Hockey League Management App';
  leagues = [];
  subscription;

  constructor(
    private leagueService: LeagueService) {

    }


  ngOnInit() {
    this.leagueService.fetchLeagues();

    this.subscription = this.leagueService.leaguesChanged.subscribe(
      () => {
        this.leagues = this.leagueService.getLeagues();
      }
    );

  }
}
