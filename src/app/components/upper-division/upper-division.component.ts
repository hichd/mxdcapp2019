
import { CapabilitiesService } from './../../services/capabilities.service';
import { Component, OnInit, Input } from '@angular/core';
import { Tile } from '../../models/Tile';

@Component({
  selector: 'app-upper-division',
  templateUrl: './upper-division.component.html',
  styleUrls: ['./upper-division.component.css']
})
export class UpperDivisionComponent implements OnInit{

  // category input from template
  @Input() category : string;

  // headers sent to template
  processesTitle:string="📌PROCESSES";
  peopleTitle:string="👥PEOPLE";
  applicationsTitle:string= `💻APPLICATIONS`; 
  appsLength:number;
  lifecycStateOfApps:string;
  systemsUrl:string="https://murex.emea.barometerit.com/b/system/";
  peopleUrl:string="https://murex.emea.barometerit.com/b/profile/";
  sysContacts = new Array < {} >();
  displaySysContacts = new Array < {} > ();

  applicationsForFilter = new Array < {} > ();
  // sent to template to render applications
  applications = new Array < {} > ();
  tempApplications = new Array < {} > () ;

  // sent to template to render people
  people = new Array < {} > ();
  tempPeople = new Array < {} > () ;
  allContacts: Tile[];
  appName: string="Click on an application to show its allContacts.";

  // hold data from http requests
  capabilitiesData : any;
  systemsData : any;
  peopleData : any;

  // services injected into constructor
  constructor(
    private capabilitiesService:CapabilitiesService) { }

  async ngOnInit() {
    this.capabilitiesData = await this.capabilitiesService.getJSONCapabilitiesToPromise();
    this.systemsData = await this.capabilitiesService.getJSONSystemsToPromise();
    this.peopleData = await this.capabilitiesService.getJSONPeopleToPromise();
    this.getAllApplications(this.category);
    this.getCapabilityContacts(this.category);
  }


  getCategory() {
    return this.category;
  }
  
  /*
    getAllplications gets all allSystems under the same input category
    and stores all of their names and lifecycleStates
  */
  public getAllApplications(category : string) {
    // loop through all processes
    for (let process of this.capabilitiesData){
      // looking to match category
      if (process.name.toUpperCase() === category.toUpperCase()){
        // once a match is found, copy all of its allSystems
        this.tempApplications = process.allSystems;
        // loop through all the allSystems
        for (let system1 of this.tempApplications){
          // only include applications
          for (let system2 of this.systemsData)
            if (system1.name.toUpperCase() === system2.name.toUpperCase()){
              if(system2.systemType.toUpperCase() === "application".toUpperCase()){
                this.applications.push({
                  "name":system1.name
                });
              }   
            }
        }
        // remove any duplicates
        this.capabilitiesService.removeSameNameObjects(this.applications);
        // reset temp variable for reuse
        this.tempApplications = new Array < {} > ();
        // loop through all capabilities' allSystems
        for ( var j = 0; j<this.systemsData.length; j++ ){
          // loop through all processes' allSystems
          for (var i = 0; i<this.applications.length; i++ ){
            let contactBarometerNo, email;
            // when the system names match copy their names and lifecyclePhase into temp
            if (this.capabilitiesService.equalityCheck(this.systemsData[j].name,this.applications[i].name)){
              this.sysContacts = new Array< {} >();
              for ( var k = 0; k<this.systemsData[j].allContacts.length; k++ ){
                for( let contact of this.peopleData ){
                  if( this.capabilitiesService.equalityCheck(contact.fullName,this.systemsData[j].allContacts[k].name)){
                    contactBarometerNo=contact.barometerNo;
                    email=contact.emailAddress;
                  }
                }
                this.sysContacts.push({
                  "name": this.systemsData[j].allContacts[k].name,
                  "qualifier": this.systemsData[j].allContacts[k].qualifier,
                  "url": this.peopleUrl+contactBarometerNo,
                  "email":email,
                  "color":this.colorOf(this.systemsData[j].allContacts[k].qualifier)
                })
              }
              this.tempApplications.push({
                "name":`${this.systemsData[j].name}`,
                "lifecyclePhase":this.systemsData[j].lifecyclePhase,
                "color": this.colorOf(this.systemsData[j].lifecyclePhase),
                "url": this.systemsUrl+this.systemsData[j].barometerNo,
                "allContacts": this.sysContacts
              });
            }
          }
        }
        // update applications
        this.applications = this.tempApplications;
        // make a copy for filtering
        this.applicationsForFilter = this.applications;
        // update length
        this.appsLength = this.applications.length;
        // break out from loop once category match is found
        break;
      }
    }
  }

  public getCapabilityContacts(category : string) {
    // loop through all of the processes
    for (let process of this.capabilitiesData){
      // looking to match category
      if (process.name.toUpperCase() === category.toUpperCase()){
        // once a match if found copy all of its allContacts
        this.tempPeople = process.allContacts;
        // loop through all of the allContacts
        for (let obj of this.tempPeople){
          let peopleBarometerNo, email;
          // store allContacts with name + (role) and color fields
          for (var i = 0; i<this.peopleData.length; i++){
            if(this.capabilitiesService.equalityCheck(this.peopleData[i].fullName,obj.name)){
              peopleBarometerNo = this.peopleData[i].barometerNo;
              email = this.peopleData[i].emailAddress;
            }
          }
          this.people.push({
            "name":obj.name,
            "qualifier":obj.qualifier,
            "color":this.colorOf(obj.qualifier),
            "url":this.peopleUrl+peopleBarometerNo,
            "email":email
          });
        }// break out from loop once category match is found
        break;
      }
    }
  }

  public updateContacts($event) {
    for (var i = 0; i<this.tempApplications.length; i++ ){
      if(this.capabilitiesService.equalityCheck(this.tempApplications[i].name,$event)){
        this.displaySysContacts = this.tempApplications[i].allContacts;
        this.appName=$event;
        break;
      }
    }
  }

  async getApplicationsForFilter() {
    return await this.applicationsForFilter;
  }

  filterApplicationsByLifecycle(lifecyclePhase : string) {    
    // to reset all filters
    if(lifecyclePhase.toUpperCase()==="".toUpperCase()){
      this.lifecycStateOfApps = "";
      // reset applications array
      this.applications = new Array < {} >  ();
      // get all applications
      this.getAllApplications(this.category);
      // update length
      this.appsLength = this.applications.length;
    // filter by lifecycle
    }else{
      this.lifecycStateOfApps = ": "+lifecyclePhase;
      // reset applications array
      this.applications = new Array < {} >  ();
      // iterate through all apps
      for (let obj of this.applicationsForFilter){
        // store apps with colors matching the filter
        if(obj.lifecyclePhase === lifecyclePhase){// fi chi 3am yekhrab hon
          this.applications.push({
            "name":`${obj.name}`,
            "lifecyclePhase":obj.lifecyclePhase,
            "color":this.colorOf(obj.lifecyclePhase),
            "url":obj.url
          });
        }
      }
      // update length
      this.appsLength = this.applications.length;
    }
  }

  // need to move to service
  public colorOf(lifecycleState : string) {
    let color : string;
    switch (lifecycleState.toUpperCase()) {
      case "ACTIVE":// process lifecycleState
      case "REUSE":// system lifecycleState
      case "INVEST":// system lifecycleState
      case "OWNER":// contact qualifier
        color = "green";
        break;
      case "MAINTAIN":// system lifecycleState
      case "PARTIALLY DELIVERS":// system qualifier
        color = "orange";
        break;
      case "Decommissioned".toUpperCase():// system lifecycleState
      case "NO LONGER DELIVERS":// system qualifier
        color = "red";
        break;
      default:
        color = "yellow";
        break;
    }
    return color;
  }  

}
