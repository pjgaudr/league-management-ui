import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lineup',
  templateUrl: './lineup.component.html',
  styleUrls: ['./lineup.component.css']
})
export class LineupComponent implements OnInit {

  simpleDrop: any = null;

  dragOperation: boolean = false;

  containers: Array<Container> = [
      new Container(1, 'Team Black (low room #)', [new Widget('Gaudreau, Patrick'), new Widget('Ladouceur, Eric')]),
      new Container(2, 'Team White (high room #)', [new Widget('Dumont, Bee'), new Widget('Cote, Jean-Claude')]),
  ];

team1 = new Container(1, 'Team Black (low room #)', [new Widget('Gaudreau, Patrick'), new Widget('Ladouceur, Eric')]);
team2 = new Container(2, 'Team White (high room #)', [new Widget('Dumont, Bee'), new Widget('Cote, Jean-Claude')]);
players = new Container(2, 'Available Players', [new Widget('Roy, Benoit'), new Widget('Grant, Trevor'), new Widget('Bowen, Matt')]);

widgets: Array<Widget> = [];
  addTo($event: any) {
      if ($event) {
          this.widgets.push($event.dragData);
      }
  }

  constructor() { }

  ngOnInit() {
  }
}

class Container {
  constructor(public id: number, public name: string, public widgets: Array<Widget>) {}
}

class Widget {
  constructor(public name: string) {}
}
