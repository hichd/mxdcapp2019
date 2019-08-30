import { Component, OnInit, Input } from '@angular/core';
import { Tile } from 'src/app/models/Tile';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  @Input() category : Tile[];
  @Input() people : Tile[];
  @Input() displaySysContacts : Tile[];
  @Input() appName : Tile[];
  
  constructor() { }

  ngOnInit() {
  }

}
