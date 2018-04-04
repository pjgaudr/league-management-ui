import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { LeagueService } from '../_services/league.service';

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
      private leagueService: LeagueService
      /*private alertService: AlertService*/) { }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();

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
                  console.error(error);
                  // this.alertService.error(error);
                  this.loading = false;
              }
          );
  }

}
