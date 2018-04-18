import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { LeagueService } from '../_services/league.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private leagueService: LeagueService,
      public snackBar: MatSnackBar
      /*private alertService: AlertService*/) { }

  ngOnInit() {
      // reset services status
      this.authenticationService.logout();
      this.leagueService.logout();

      // get return url from route parameters or default to '/welcome'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/welcome';      
  }

  login() {
      this.loading = true;
      this.authenticationService.login(this.model.username, this.model.password)
          .subscribe(
              data => {
                  this.leagueService.fetchLeagues();
                  this.router.navigate(['/welcome']);
              },
              error => {
                  // this.alertService.error(error);
                  this.snackBar.open("Invalid username of password. Please try again...", 'Ok', {duration: 3000});            
                  this.model.password = "";
                  this.loading = false;
              }
          );
  }
}
