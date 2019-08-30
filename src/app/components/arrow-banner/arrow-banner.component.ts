import { Component, OnInit, Input } from '@angular/core';
import { Tile } from 'src/app/models/Tile';

@Component({
  selector: 'app-arrow-banner',
  templateUrl: './arrow-banner.component.html',
  styleUrls: ['./arrow-banner.component.css']
})
export class ArrowBannerComponent implements OnInit {

  @Input() processes : Tile[];

  constructor() { }

  ngOnInit() {
  }
}