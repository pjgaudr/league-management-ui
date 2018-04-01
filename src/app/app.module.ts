import { BrowserModule } from '@angular/platform-browser';
import { MatChipsModule, MatTableModule, MatToolbarModule, MatIconModule, MatTabsModule, MatSlideToggleModule, MatMenuModule, MatCheckboxModule, MatDatepicker, MatDatepickerModule, MatNativeDateModule, MatSortModule} from '@angular/material';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LeagueService } from './league.service';
import { LeagueComponent } from './league/league.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PlayerComponent } from './player/player.component';
import { LineupComponent } from './lineup/lineup.component';
import { AdminComponent } from './admin/admin.component';
import { AccountComponent } from './account/account.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {DndModule} from 'ng2-dnd';

const routes = [
  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'league/:id', component: LeagueComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'account', component: AccountComponent },
  { path: '**', component: WelcomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LeagueComponent,
    WelcomeComponent,
    PlayerComponent,
    LineupComponent,
    AdminComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    MatChipsModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    HttpModule,
    NoopAnimationsModule,
    RouterModule.forRoot(routes),
    DndModule.forRoot()
  ],
  providers: [LeagueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
