import { CapabilitiesService } from './../../services/capabilities.service';
import { Component, OnInit, NgZone } from '@angular/core';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";

am4core.useTheme(am4themes_animated);


@Component({
  selector: 'app-directed-graph',
  templateUrl: './directed-graph.component.html',
  styleUrls: ['./directed-graph.component.css']
})
export class DirectedGraphComponent implements OnInit {

  showFiller = false;

  connectionsData = new Array < {} > ();
  allSystemsData = new Array < {} > ();
  linksBetweenSystems = new Array < {} > ();
  connectedAndDisconnectedSystems = new Array < {} > ();
  connectedSystemsOnly = new Array < {} > ();
  notConnectedSystems = new Array < {} > ();
  systemsToDraw = new Array < {} > ();
  // legendToggle : boolean;
  navigationToggle : boolean;
  minPercentNodeSize : number;
  maxPercentNodeSize : number;
  nodeLevel : number;
  linkWithStrength : number;

  allCnx : string = "All System Connections";
  connectedSys : string = "Interconnected Systems";
  standAloneSys : string = "Stand Alone Systems";
  graphTitle : string = this.allCnx;



  private chart: am4plugins_forceDirected.ForceDirectedTree;

  constructor(
    private capabilitiesService : CapabilitiesService,
    private zone : NgZone
    ) { }

  
  async ngOnInit() {
    // this.ngOnDestroy();
    this.allSystemsData = await this.capabilitiesService.getSystemsData();
    this.connectionsData = await this.capabilitiesService.getConnectionsData();
    console.log("Connx data : ", this.connectionsData);
    this.getInitialSystems();
    this.directedGraphDrawing(this.systemsToDraw);
    // console.log("all sys data : ");
    // console.log(this.allSystemsData);
    // console.log("connected systems : ");
    // console.log(this.connectedSystemsOnly);
    // console.log("not connected sys : ");
    // console.log(this.notConnectedSystems);
    // console.log("all sys connx : ");
    // console.log(this.connectedAndDisconnectedSystems);
  }

  directedGraphDrawing(data : any){
    console.log("Inside graph function");

    this.zone.runOutsideAngular(() => {

      // chart will only start initializing when its container scrolls into view
      am4core.options.onlyShowOnViewport = true;

      var chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);
      var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())

      // legend
      // if(this.legendToggle){        
      //   chart.legend = new am4charts.Legend();
      // }

      networkSeries.dataFields.linkWith = "linkWith";
      networkSeries.dataFields.name = "name";
      networkSeries.dataFields.id = "name";
      networkSeries.dataFields.value = "value";
      networkSeries.dataFields.children = "children";
      networkSeries.dataFields.color = "color";

      // controlling node size
      networkSeries.minRadius = am4core.percent(this.minPercentNodeSize);
      networkSeries.maxRadius = am4core.percent(this.maxPercentNodeSize);
      
      networkSeries.nodes.template.label.text = "{displayName}";
      networkSeries.fontSize = am4core.percent(52);
      networkSeries.linkWithStrength = this.linkWithStrength;

      // only show 1st level parent nodes
      networkSeries.maxLevels = this.nodeLevel;
      
      var nodeTemplate = networkSeries.nodes.template;
      nodeTemplate.adapter.add("tooltipText", (text,target) => {
        if (target.dataItem) {
          switch (target.dataItem.linkWith.length) {
            case undefined:
              text = "case undefiend";
              break;
            case 0:
              if (target.dataItem.value>1){
                // text = "{name} ({type})";
              text = "[bold][font-size: 20px]{name}[/][/]\n({type})";

              }else{
                console.log(this.connectedSystemsOnly);
                text = "{name}";
              }
              break;
            default:
              text = "[bold][font-size: 20px]{name}[/][/]\n({type})\n\n[text-decoration: underline overline]Connected to :[/] {linkWith}";              
              break;
          }
        }
        return text;
     })
      // nodeTemplate.fillOpacity =0.95; 
      nodeTemplate.label.hideOversized = false;
      nodeTemplate.label.truncate = true;
      
      var linkTemplate = networkSeries.links.template;
      linkTemplate.strokeWidth = 0.85;
      var nodeHoverState = nodeTemplate.states.create("hover");
      nodeHoverState.properties.fillOpacity = 3;
      var linkHoverState = linkTemplate.states.create("hover");
      linkHoverState.properties.strokeOpacity = 3;
      linkHoverState.properties.strokeWidth = 4;

      nodeTemplate.events.on("hit", function(event) {
        var dataItem = event.target.dataItem;
        console.log("clicked on ", dataItem.name);
        if(this.navigationToggle){
        //   this.getEntityConnections(dataItem.name);
        }
      }, this);
      
      if(!this.navigationToggle)
      {
        nodeTemplate.events.on("over", function (event) {
            var dataItem = event.target.dataItem;
            dataItem.childLinks.each(function (link) {
                link.isHover = true;
            })
        })
        
        nodeTemplate.events.on("out", function (event) {
            var dataItem = event.target.dataItem;
            dataItem.childLinks.each(function (link) {
                link.isHover = false;
            })
        })
      }
      
      networkSeries.data = data;
      
      // for exporting chart
      chart.exporting.menu = new am4core.ExportMenu();
      chart.exporting.menu.align = "left";
      chart.exporting.menu.verticalAlign = "top";   
    });
  }

  getInitialSystems(){
    // graph settings
    this.graphTitle = this.allCnx;
    this.navigationToggle = false;
    this.linkWithStrength = 0.15;
    this.minPercentNodeSize = 1.2;
    this.maxPercentNodeSize = 3;
    this.nodeLevel = 1;
    let children = [];
    let linkWith = [];
    // loop through all systems
    for( let sysObj1 of this.allSystemsData){
      // loop through all systems once more ANOTHA ONE #BLESSED #WETHEBEST #DDD JJJJ KHALED RUN IT BACK TURBO
      for( let sysObj2 of this.allSystemsData){
        // if system names match do nothing DONT BE A FOOL WRAP YOUR TOOL
        if(this.capabilitiesService.equalityCheck(sysObj2.name,sysObj1.name)){
        }else{// otherwise start matching data
          // loop through first system's data 
          for( let connection1 of sysObj1.allConnections){
            // loop through second system's data
            for( let connection2 of sysObj2.allConnections){
              // if data is the same then there is a link between these systems
              if( this.capabilitiesService.equalityCheck(connection1.name,connection2.name)){
                // store second system's name in an array of links
                this.linksBetweenSystems.push("\r\n"+sysObj2.name);
              }// break out of loop
            }
          }
        }
      }
      this.capabilitiesService.removeDuplicateElements(linkWith);
      for( let data1 of sysObj1.allData){
        if(this.capabilitiesService.equalityCheck(data1.qualifier,"has parameter") ||
          this.capabilitiesService.equalityCheck(data1.qualifier,"target system")){
        }else{
          children.push(
            {
              "name":`${data1.name} (${data1.qualifier})`,// for matching data by name
              "color":this.capabilitiesService.colorOf(data1.qualifier),
              "linkWith":[],
              "type":data1.qualifier,
              "value":0,
              "displayName":data1.name
            }
          );
        }
      }
      this.connectedAndDisconnectedSystems.push(
        {
          "name" : "\r\n"+sysObj1.name,
          "linkWith" : this.capabilitiesService.removeDuplicateElements(this.linksBetweenSystems),
          "type" : sysObj1.systemType,
          "color" : this.capabilitiesService.colorOf(sysObj1.systemType),
          "children" : children,
          "value" : children.length+76,
          "connections" : sysObj1.allConnections.length,
          "displayName" : sysObj1.name.substring(0,4)+"..."
        }
      );
      children = [];
      linkWith = [];
      this.linksBetweenSystems = new Array < {} > ();
    }
    for( let sysObj of this.connectedAndDisconnectedSystems){
      if(sysObj.connections===0){
        this.notConnectedSystems.push(sysObj);
      }else{
        this.connectedSystemsOnly.push(sysObj);
      }
    }
    this.systemsToDraw = this.connectedAndDisconnectedSystems;
    // console.log(this.connectedSystems);
  }

  displaySystemsWithConnections(){
    this.graphTitle = this.connectedSys;
    // this.legendToggle = false;
    this.linkWithStrength = 0.001;
    // this.minPercentNodeSize = 1.6;
    this.maxPercentNodeSize = 3;
    this.systemsToDraw = this.connectedSystemsOnly;
    this.ngOnDestroy();
    this.directedGraphDrawing(this.systemsToDraw);
  }

  displayAllSystemConnections(){
    this.graphTitle = this.allCnx;
    // this.legendToggle = false;
    this.linkWithStrength = 0.15;
    // this.minPercentNodeSize = 1.6;
    this.maxPercentNodeSize = 3;
    this.systemsToDraw = this.connectedAndDisconnectedSystems;
    this.ngOnDestroy();
    this.directedGraphDrawing(this.systemsToDraw);
  }

  displayStandAloneSystems(){
    this.graphTitle = this.standAloneSys;
    // this.legendToggle = true;
    this.linkWithStrength = 0.001;
    // this.minPercentNodeSize = 1.6;
    this.maxPercentNodeSize = 2.5;
    this.systemsToDraw = this.notConnectedSystems;
    this.ngOnDestroy();
    this.directedGraphDrawing(this.systemsToDraw);
  }

  
  /*
    get connections to any clicked entity
  */
  // getEntityConnections(entityName : string){
  //   let bn, sysType, connectionsArr, tempSystems, linkWith : any;
  //   let allLinks = [];
  //   // loop through all systems
  //   for(let sysObj1 of this.allSystemsData){
  //     // find system in question
  //     if(this.capabilitiesService.equalityCheck(sysObj1.name,entityName)){
  //       bn = sysObj1.barometerNo;
  //       sysType = sysObj1.systemType;
  //       connectionsArr = [];
  //       linkWith = [];
  //       // loop through system's data
  //       for(let i = 0; i<sysObj1.connections.length; i++){
  //         // loop through all systems again
  //         for(let sysObj2 of this.allSystemsData){
  //           // if it's the same system 
  //           if(this.capabilitiesService.equalityCheck(sysObj2.name,sysObj1.name)){
  //             // do nothing
  //           }else{// otherwise loop through system's data
  //             for(let connection of sysObj2.connections){
  //               // looking for a match in the data name
  //               if(this.capabilitiesService.equalityCheck(connection.name,sysObj1.connections[i].name))
  //               {
  //                 linkWith.push(sysObj2.name);
  //               }
  //             }
  //           }
  //         }
  //         connectionsArr.push(
  //           {
  //             "name" : sysObj1.connections[i].name,
  //             "type" : sysObj1.connections[i].qualifier,
  //             "color" : this.capabilitiesService.colorOf(sysObj1.connections[i].qualifier),
  //             "linkWith" : linkWith.concat(entityName)
  //           });
  //           allLinks = this.capabilitiesService.removeDuplicateElements(allLinks.concat(linkWith));
  //           console.log(allLinks);
  //         linkWith = [];
  //       }
  //       break;
  //     }
  //   }
  //   allLinks = this.capabilitiesService.removeDuplicateElements(allLinks);
  //   tempSystems = new Array < {} > ();
  //   for(let link of allLinks){
  //     for(let sysObj2 of this.allSystemsData)
  //       {
  //       if(this.capabilitiesService.equalityCheck(link,sysObj2.name))
  //         {
  //           tempSystems.push({
  //             "name" : sysObj2.name,
  //             "type" : sysObj2.systemType,
  //             "value" : sysObj2.barometerNo,
  //             "color" : this.capabilitiesService.colorOf(sysObj2.systemType),
  //             "linkWith" : []
  //           });
  //         }
  //       }
  //   }
  //   console.log(linkWith);
  //   tempSystems.push({
  //     "name" : entityName,
  //     "type" : sysType,
  //     "children" : connectionsArr,
  //     "value" : bn,
  //     "linkWith" : [],
  //     "color" : this.capabilitiesService.colorOf(sysType)
  //   });
  //   connectionsArr = [];    
  //   // this.connectedSystems = new Array < {} > ();
  //   // console.log("tmp sys  : ",tempSystems);
  //   this.connectedAndDisconnectedSystems = tempSystems;
  //   // console.log("all sys conx :",this.allSystemConnections);
  //   this.ngOnDestroy();
  //   this.ngOnInit();
  // }



  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}