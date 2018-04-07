import { BrowserModule } from '@angular/platform-browser';
import { MatChipsModule, MatTableModule, MatToolbarModule, MatIconModule, MatTabsModule, MatSlideToggleModule, MatMenuModule, MatCheckboxModule, MatDatepicker, MatDatepickerModule, MatNativeDateModule, MatSortModule, MatCardModule, MatExpansionModule, MatGridListModule, MatSnackBar, MatSnackBarModule} from '@angular/material';
import { NgModule, Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { LeagueService } from './_services/league.service';
import { PlayerDashboardComponent } from './player-dashboard/player-dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { InvitationsComponent } from './invitations/invitations.component';
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
import { PlayerService } from './_services/player.service';
import { LeagueMgtComponent } from './league-mgt/league-mgt.component';
import { AuthInterceptor } from './_helpers/auth_interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorHandlingHelper } from './_helpers/http.error.handling';

const routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'welcome', component: PlayerDashboardComponent, canActivate: [AuthGuard] },
//  { path: 'league/:id', component: PlayerDashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PlayerDashboardComponent,
    WelcomeComponent,
    InvitationsComponent,
    LineupComponent,
    AdminComponent,
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    LeagueMgtComponent
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
    MatCardModule,
    MatExpansionModule,
    MatGridListModule,
    MatSnackBarModule,
    HttpModule,
    HttpClientModule,
    NoopAnimationsModule,
    RouterModule.forRoot(routes),
    DndModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, 
    LeagueService, 
    AuthenticationService, 
    PlayerService, 
    AuthGuard,
    ErrorHandlingHelper],
  bootstrap: [AppComponent]
})
export class AppModule { }
