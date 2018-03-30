import { BrowserModule } from '@angular/platform-browser';
import { MatChipsModule, MatTableModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LeagueService } from './league.service';
import { LeagueComponent } from './league/league.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserComponent } from './user/user.component';
import { GameComponent } from './game/game.component';

const routes = [
  { path: '', component: WelcomeComponent },
  { path: 'league/:id', component: LeagueComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'game/:id', component: GameComponent },
  { path: '**', component: WelcomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LeagueComponent,
    WelcomeComponent,
    UserComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    MatChipsModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [LeagueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
