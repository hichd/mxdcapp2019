import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBotIframeComponent } from './chat-bot-iframe.component';

describe('ChatBotIframeComponent', () => {
  let component: ChatBotIframeComponent;
  let fixture: ComponentFixture<ChatBotIframeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatBotIframeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatBotIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
