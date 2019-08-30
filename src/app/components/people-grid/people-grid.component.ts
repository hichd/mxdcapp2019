import { Component, Input } from '@angular/core';
import { Tile } from '../../models/Tile';

@Component({
  selector: 'app-people-grid',
  templateUrl: './people-grid.component.html',
  styleUrls: ['./people-grid.component.css']
})
export class PeopleGridComponent {

  // component taking custom input as type Tile[]
  @Input() tiles : Tile[];

  constructor() { }

  


}
