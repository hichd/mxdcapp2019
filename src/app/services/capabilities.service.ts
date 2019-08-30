import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CapabilitiesService{

  // local json barometerit report
  // capabilitiesApi = "http://localhost:15565/api/capabilities";
  // systemsApi = "http://localhost:15565/api/systems";
  // connectionsApi = "http://localhost:15565/api/connections";
  // peopleApi= "http://localhost:15565/api/people";
  capabilitiesApi = "../../assets/data/fullCapabilitiesReport.json";
  systemsApi = "../../assets/data/fullSystemsReport.json";
  connectionsApi = "../../assets/data/fullConnectionsReport.json";
  peopleApi= "../../assets/data/fullPeopleReport.json";
  capabilitiesData;
  systemsData;
  connectionsData;
  peopleData;

  constructor(private http: HttpClient) { }

  async getCapabilitiesData(){
    this.capabilitiesData = await this.getJSONCapabilitiesToPromise();
    return await this.capabilitiesData;
  }

  async getSystemsData(){
    this.systemsData = await this.getJSONSystemsToPromise();
    return await this.systemsData;
  }

  async getConnectionsData(){
    this.connectionsData = await this.getJSONConnectionsToPromise();
    return await this.connectionsData;
  }

  async getPeopleData(){
    this.peopleData = await this .getJSONPeople();
    return await this.peopleData;
  }

  // All HttpClient methods return an RxJS Observable of something.
  public getJSONCapabilities(): Observable<any> {
    return this.http.get(this.capabilitiesApi);
  }
  public getJSONSystems(): Observable<any> {
    return this.http.get(this.systemsApi);
  }
  public getJSONConnections(): Observable<any> {
    return this.http.get(this.connectionsApi);
  }
  public getJSONPeople(): Observable<any>{
    return this.http.get(this.peopleApi);
  }

  // turning http request into promise
  public getJSONCapabilitiesToPromise(): Promise<any>{
    return this.getJSONCapabilities().toPromise();
  }
  public getJSONSystemsToPromise(): Promise<any>{
    return this.getJSONSystems().toPromise();
  }
  public getJSONConnectionsToPromise(): Promise<any>{
    return this.getJSONConnections().toPromise();
  }
  public getJSONPeopleToPromise(): Promise<any>{
    return this.getJSONPeople().toPromise();
  }

  // remove duplicate objects with same name in array of objects
  public removeSameNameObjects(arr : any){
    arr.sort(arr => {
      return arr.name.toUpperCase();});
    for(var i=1; i< arr.length;){
      if ( arr[i-1].name === arr[i].name){
        arr.splice(i, 1);
      }else{
        i++;
      }
    }
    return arr;
  }
  
  // remove duplicate elements in array
  public removeDuplicateElements(arr : any){
    arr.sort();
    for(var i=1; i< arr.length;){
      if ( arr[i-1] === arr[i]){
        arr.splice(i, 1);
      }else{
        i++;
      }
    }
    return arr;
  }

  public colorOf (system : string){
    let color : string;
    switch(system.toUpperCase()){
      case "application".toUpperCase():
        color = "navy";
        break;
      case "module".toUpperCase():
        color = "purple";
        break;
      case "object".toUpperCase():
        color = "grey";
        break;
      case "master system".toUpperCase():
        color = "blue";
        break;
      case "has parameter".toUpperCase():
        color = "olive";
        break;
      case "consuming system".toUpperCase():
        color = "black";
        break;
      case "target system".toUpperCase():
        color = "lime";
        break;
      default:
        color = "yellow";
        break;
    }
    return color; 
  }

  // checks equality between two strings
  public equalityCheck(firstString : string, secondString : string){
    return firstString.toUpperCase()===secondString.toUpperCase();
  }
}