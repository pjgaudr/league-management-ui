import { Component, OnInit } from '@angular/core';
import { MatDatepicker, MatSort } from '@angular/material';
import { LeagueService } from '../_services/league.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
