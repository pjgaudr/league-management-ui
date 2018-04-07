import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../_services/player.service';
import { MatSnackBar } from '@angular/material';

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
      private userService: PlayerService,
      public snackBar: MatSnackBar) { }

  register() {
      this.loading = true;
      this.userService.createPlayer(this.model)
          .subscribe(
              data => {
                  this.snackBar.open("Registration successful", 'Ok', {duration: 3000});            
                  this.router.navigate(['/login']);
              },
              error => {
                  this.snackBar.open("ERROR - Registration failed", 'Ok', {duration: 3000});            
                  this.loading = false;
              });
  }
}
