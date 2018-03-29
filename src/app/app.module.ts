import { BrowserModule } from '@angular/platform-browser';
import { MatChipsModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LeagueService } from './league.service';
import { LeagueComponent } from './league/league.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes = [
  { path: '', component: WelcomeComponent },
  { path: 'league/:id', component: LeagueComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LeagueComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    MatChipsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [LeagueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
