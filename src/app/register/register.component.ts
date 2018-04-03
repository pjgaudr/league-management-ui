import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  model: any = {};
  loading = false;

  constructor(
      private router: Router,
      private userService: UserService,
      /*private alertService: AlertService*/) { }

  register() {
      this.loading = true;
      this.userService.createUser(this.model)
          .subscribe(
              data => {
                  //this.alertService.success('Registration successful', true);
                  console.log('Registration successful');
                  this.router.navigate(['/login']);
              },
              error => {
                  //this.alertService.error(error);
                  console.error(error);
                  this.loading = false;
              });
  }
}
