import { Component, OnInit, Injectable, ChangeDetectorRef } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { LeagueService } from './_services/league.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit {

  title = 'Hockey League Management';

  selectedLeague:String = '';

  leagues = [];
  leaguesChangedSubscription;

  constructor(
    private leagueService: LeagueService,
    private changeDetectorRef: ChangeDetectorRef) {
      console.log("New AppComponent");
    }


  ngOnInit() {
    this.leaguesChangedSubscription = this.leagueService.leaguesChanged.subscribe(
      () => {
        this.leagues = this.leagueService.getLeagues();
        if(this.leagues.length > 0)
        {
          this.selectedLeague = this.leagues[0].id;
        }
      }
    );
  }

  getSelectedLeague()
  {
      return this.selectedLeague;
  }
}
