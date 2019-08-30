import { CapabilitiesService } from './../../services/capabilities.service';
import { Component, OnInit } from '@angular/core';
import {MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  categories = new Array < {} > ();
  data;

  constructor(
    private capabilitiesService : CapabilitiesService
    ) {  }

  async ngOnInit(  ) {
    this.data = await this.capabilitiesService.getJSONCapabilitiesToPromise();
    this.getAllCategories();
  }

  /*
    get all categories except for:
    - "application lifecycle management (old)"
    - "deprecated"
    - "mx quality"
  */
  getAllCategories(){
    for(let process of this.data){
      if(process.capabilityType.toUpperCase()==="category".toUpperCase() &&
      process.name.toUpperCase()!=="application lifecycle management (old)".toUpperCase() &&
      process.name.toUpperCase()!=="deprecated".toUpperCase() &&
      process.name.toUpperCase()!=="mx quality".toUpperCase()){
        this.categories.push({"name":process.name});
      }
    }
  }
}