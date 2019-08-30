import { UpperDivisionComponent } from './../upper-division/upper-division.component';
import { Component, OnInit } from '@angular/core';
import { Tile } from '../../models/Tile'


@Component({
  selector: 'app-buttons-grid',
  templateUrl: './buttons-grid.component.html',
  styleUrls: ['./buttons-grid.component.css']
})
export class ButtonsGridComponent implements OnInit {

  reuse:string="Reuse";
  maintain:string="Maintain";
  decommissioned:string="Decommissioned";
  invest:string="Invest";
  reset:string="";
  buttons : Tile[];

  constructor(
    private upperDivisionComponent : UpperDivisionComponent
    ) { }

  
  ngOnInit() {  }

  filterByLifecycle($event){
    this.upperDivisionComponent.filterApplicationsByLifecycle($event);
  }

  colorOf(qualifier : string){
    let color:string;
    color = this.upperDivisionComponent.colorOf(qualifier);
    return color;
  }

  isEmpty($event){
    for (let app of this.upperDivisionComponent.applicationsForFilter){
      if (app.lifecyclePhase.toUpperCase() === $event.toUpperCase()){
        return false;
      }
    }
    return true;
  }

}
