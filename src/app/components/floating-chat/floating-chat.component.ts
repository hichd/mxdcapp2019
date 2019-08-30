import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-floating-chat',
  templateUrl: './floating-chat.component.html',
  styleUrls: ['./floating-chat.component.css']
})
export class FloatingChatComponent implements OnInit{

  constructor() {}

  ngOnInit() {
    // to open chat window on init
    this.controlChatBox();
  }

  public controlChatBox() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

}
