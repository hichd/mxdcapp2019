import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatButtonModule,
  MatCheckboxModule,
  MatGridListModule
} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatTreeModule, MatTree} from '@angular/material/tree';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';


import { UpperDivisionComponent } from './components/upper-division/upper-division.component';
import { ButtonsGridComponent } from './components/buttons-grid/buttons-grid.component';
import { ProcessesTreeComponent } from './components/processes-tree/processes-tree.component';
import { PeopleGridComponent } from './components/people-grid/people-grid.component';
import { HttpClientModule } from '@angular/common/http';
import { CapabilitiesService } from './services/capabilities.service';
import { TabsComponent } from './components/tabs/tabs.component';
import { DirectedGraphComponent } from './components/directed-graph/directed-graph.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FloatingChatComponent } from './components/floating-chat/floating-chat.component';
import { ChatBotIframeComponent } from './components/chat-bot-iframe/chat-bot-iframe.component';
import { ApplicationsHolderComponent } from './components/applications-holder/applications-holder.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ArrowBannerComponent } from './components/arrow-banner/arrow-banner.component';


@NgModule({
  declarations: [
    AppComponent,
    UpperDivisionComponent,
    ButtonsGridComponent,
    ProcessesTreeComponent,
    PeopleGridComponent,
    TabsComponent,
    DirectedGraphComponent,
    SidenavComponent,
    FloatingChatComponent,
    ChatBotIframeComponent,
    ApplicationsHolderComponent,
    ContactListComponent,
    ArrowBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatTreeModule,
    MatIconModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatListModule
  ],
  entryComponents: [
    ChatBotIframeComponent,
  ],
  providers: [  
    CapabilitiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
