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

  selectedLeague;
  selectedLeagueChangedSubscription;

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
      }
    );

    // this.selectedLeagueChangedSubscription = this.leagueService.selectedLeagueChanged.subscribe(
    //   () => {
    //     this.selectedLeague = this.leagueService.getSelectedLeague();
    //     console.log("selectedLeague changed, trying to refresh to:" );
    //     this.changeDetectorRef.detectChanges();
    //   }       
    // );
  }
  
}
