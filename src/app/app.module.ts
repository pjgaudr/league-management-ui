import { BrowserModule } from '@angular/platform-browser';
import { MatChipsModule, MatTableModule, MatToolbarModule, MatIconModule, MatTabsModule, MatSlideToggleModule, MatMenuModule, MatCheckboxModule, MatDatepicker, MatDatepickerModule, MatNativeDateModule, MatSortModule} from '@angular/material';
import { NgModule, Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { LeagueService } from './_services/league.service';
import { LeagueComponent } from './league/league.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PlayerComponent } from './player/player.component';
import { LineupComponent } from './lineup/lineup.component';
import { AdminComponent } from './admin/admin.component';
import { AccountComponent } from './account/account.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {DndModule} from 'ng2-dnd';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './_services/authentication.service';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './_guards/index';
import { RegisterComponent } from './register/register.component';
import { UserService } from './_services/user.service';

const routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },
  { path: 'league/:id', component: LeagueComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LeagueComponent,
    WelcomeComponent,
    PlayerComponent,
    LineupComponent,
    AdminComponent,
    AccountComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
  providers: [LeagueService, AuthenticationService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
