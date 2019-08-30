import { UpperDivisionComponent } from './../upper-division/upper-division.component';
import { Component, OnInit, Input } from '@angular/core';
import { Tile } from 'src/app/models/Tile';

@Component({
  selector: 'app-applications-holder',
  templateUrl: './applications-holder.component.html',
  styleUrls: ['./applications-holder.component.css']
})
export class ApplicationsHolderComponent implements OnInit {
  
  @Input() tiles : Tile[];

  constructor(
    private upperDivisionComponent : UpperDivisionComponent
  ) { }

  ngOnInit() {
  }

  public emptyContacts(){
  }

  public updateContacts($event){
    this.upperDivisionComponent.updateContacts($event);
  }

}
