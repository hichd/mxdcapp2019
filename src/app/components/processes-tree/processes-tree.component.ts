import { UpperDivisionComponent } from './../upper-division/upper-division.component';
import { Component } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { DataNode } from './../../models/DataNode';
import {
  MatTreeFlatDataSource, 
  MatTreeFlattener } from '@angular/material/tree';
import { CapabilitiesService } from './../../services/capabilities.service';

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-processes-tree',
  templateUrl: './processes-tree.component.html',
  styleUrls: ['./processes-tree.component.css']
})
export class ProcessesTreeComponent{

  // filtering buttons labels
  create : string="Create";
  existing : string="Existing";
  upgrade : string="Upgrade";
  retire : string="Retire";

  nestedCapabilites = [];
  capabilitiesData:any;
  processFirstLayer = new Array < {} > ();
  processSecondLayer = new Array < {} > ();
  processThirdLayer = new Array < {} > ();

  activities = new Array < {} > ();
  secondFromBottom = new Array < {} > ();
  thirdFromBottom = [];

  processes = new Array < {} > ();
  businessGroupsAndProcesses = new Array < {} > ();

  processesLifeCycleStates = new Array < {} > ();
  tempProcessesLifeCycles = new Array < {} > ();
  filteredProcesses = new Array < {} > ();

  capabilityUrl = "https://murex.emea.barometerit.com/b/capability/";

  /**
 * @title Tree with flat nodes from angular material
 */
  
  // private _transformer = (node: DataNode, level: number) => {
  //   return {
  //     expandable: !!node.children && node.children.length > 0,
  //     name: node.name,
  //     level: level,
  //   };
  // }

  // treeControl = new FlatTreeControl<ExampleFlatNode>(
  //     node => node.level, node => node.expandable);

  // treeFlattener = new MatTreeFlattener(
  //     this._transformer, node => node.level, node => node.expandable, node => node.children);

  // dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private capabilitiesService : CapabilitiesService,
    private upperDivisionComponent : UpperDivisionComponent) {  }

  async ngOnInit(){ 
    this.capabilitiesData = await this.capabilitiesService.getJSONCapabilitiesToPromise(); 
    //passing in category from upper division component
    this.nestedCapabilites = this.getAllNestedCapabilities(this.upperDivisionComponent.getCategory());
    // this.dataSource.data = this.nestedCapabilites;
    this.filterProcessCapabilities("");
  }
  
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  public getAllNestedCapabilities(category : string){    
    // loop through json report looking for a category to match
      for (let topProcess of this.capabilitiesData){
        if (this.capabilitiesService.equalityCheck(topProcess.name,category)){
          // when a category match is found, loop through its first children process groups
          let firstChildProcesses = topProcess.childCapabilities;
          for(let firstChildProcess of firstChildProcesses){
            // store first children process groups in array
            this.processFirstLayer.push(firstChildProcess.name);
            // loop through process groups
            for(let process of this.capabilitiesData){
              // looking to match category's first children capabilities with process names
              if (this.capabilitiesService.equalityCheck(process.name,firstChildProcess.name)){
                // once a match is found, store the names of its children (category's grand children)
                let secondChildProcesses = process.childCapabilities;
                for (let secondChildProcess of secondChildProcesses){
                  this.processSecondLayer.push(secondChildProcess.name);
                  let lifecycleState, barometerNo;
                  for( let processObj of this.capabilitiesData){
                    if(this.capabilitiesService.equalityCheck(processObj.name,secondChildProcess.name)){
                      lifecycleState = processObj.lifecycleState;
                      barometerNo = processObj.barometerNo;
                    }
                  }
                  this.processes.push(
                    {
                      "name": secondChildProcess.name,
                      "lifecycleState": lifecycleState,
                      "url":this.capabilityUrl+barometerNo
                    }
                  );
                  // loop through data a third time 
                  for (let dataItem of this.capabilitiesData){
                    // looking to match third level children process names
                    if (this.capabilitiesService.equalityCheck(dataItem.name,secondChildProcess.name)){
                      // store processes only with their lifcycleState
                      if (this.capabilitiesService.equalityCheck(dataItem.capabilityType,"process")){
                        this.tempProcessesLifeCycles.push(
                          {
                            "name":dataItem.name,
                            "capaibilityType":dataItem.capabilityType,
                            "lifecycleState":dataItem.lifecycleState,
                            "url":this.capabilityUrl+dataItem.barometerNo
                          }
                        );
                      }
                      // once found, store its children's names
                      let thirdChildProcesses = dataItem.childCapabilities;
                      for (let thirdChildProcess of thirdChildProcesses){
                        this.processThirdLayer.push(thirdChildProcess.name);                 
                      }// format activities into object with name key
                      for (let activity of this.processThirdLayer){
                        this.activities.push({"name":`📌${activity}`});
                      }// reset third layer process' array for next for loop iteration
                      this.processThirdLayer = new Array < {} > ();
                      // format bottom layer with second from bottom layer of processes into nested array of objects
                      for (let processItem of this.processSecondLayer){
                        this.secondFromBottom.push(
                          {
                            "name":`${processItem}`, 
                            "children":this.activities
                          }
                        );
                      }// reset second layer array for next iteration of the for loop
                      this.processSecondLayer = new Array < {} > ();
                      this.activities = new Array < {} > ();
                    }
                  }
                }// format second from bottom layer into array of nested nested objects
                this.thirdFromBottom.push(
                  {
                    "name":`${process.name}`,
                    "children":this.secondFromBottom
                  }
                );
                let color;
                if(this.processes.length==0){
                  color="green";
                  break;
                }
                for(let processObj of this.processes){
                  if(this.capabilitiesService.equalityCheck(processObj.lifecycleState,"Inactive")){
                    color = "red";
                    break;
                  }
                }       
                for(let processObj of this.processes){
                  if(typeof(color)==="undefined"){
                    if(this.capabilitiesService.equalityCheck(processObj.lifecycleState,"Planned")){
                      color = "yellow";
                      break;
                    }{
                      color="green";
                    }
                }
                }
                this.businessGroupsAndProcesses.push(
                  {
                    "name": process.name,
                    "lifecycleState": process.lifecycleState,
                    "children": this.processes,
                    "color":color
                  }
                );
                // reset secondFromBottom array for the next iteration of the for loop
                this.secondFromBottom = new Array < {} > ();
                this.processes = new Array < {} > ();
              }
            }
          }
          break;// once we have a category match, break out of the loop
      }
      }
    // this.capabilitiesService.logger(this.businessGroupsAndProcesses);
    return this.thirdFromBottom;  
  }

  public filterProcessCapabilities(lifecycleState : string){}
  //   if(this.capabilitiesService.equalityCheck(lifecycleState,"")){
  //     this.dataSource.data = this.nestedCapabilites;
  //   }else{
  //     this.dataSource.data = [];
  //     this.filteredProcesses = new Array < {} > ();
  //     for(let process of this.processesLifeCycleStates){
  //       if(this.capabilitiesService.equalityCheck(lifecycleState,process.lifecycleState)){
  //         this.filteredProcesses.push(process);
  //       }
  //     }
  //   }
  // }
}