import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IEvent } from './shared/index'

@Component({
  selector: 'event-thumbnail',
  template: `
          <div class="well hoverwell thumbnail">
            <h2 [ngStyle]="getStartTimeStyle()" [routerLink]="['/events', event.id]" >{{event?.name}}</h2>
            <div>Date : {{event?.date}}</div>
            <div [ngClass] ="getStartTimeClass()" [ngSwitch]="event?.time">
              Time : {{event?.time}}
              <span *ngSwitchCase="'8:00 am'"> (Early Start)</span>
              <span *ngSwitchCase="'10:00 am'"> (Late Start)</span>
              <span *ngSwitchDefault> (Normal Start)</span>
            </div>
            <div>Price : \${{event?.price}}</div>
            <div *ngIf="event?.location">
              <span>Location: {{event?.location?.address}}</span>
              <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
            </div>
            <div [hidden]="!event?.onlineUrl">
             Online URL : {{event?.onlineUrl}}
            </div>
            <button class="btn btn-primary" (click)="handleClickMe()">Click Me!</button>
          </div>
  `,
  styles: [`
      .green {color: lightgreen !important;}
      .red {color: red !important;}
      .bold {font-weight: bold;}
      .thumbnail {min-height: 210px;}
      .pad-left { margin-left: 10px; }
      .well div { color: #bbb; }
  `]
})
export class EventThumbnailComponent {
  @Input() event:IEvent
  @Output() eventClick = new EventEmitter()

  handleClickMe() {
    this.eventClick.emit(this.event.name)
  }

  logClick() {
    console.log('LOG!')
  }

  getStartTimeClass() {
    if (this.event && this.event.time === '8:00 am')
      return ['green', 'bold']
    else if (this.event && this.event.time === '10:00 am')
    return ['red', 'bold']

    return []
  }

  getStartTimeStyle():any {
    var check = this.event.name;
    if (check.indexOf('ng-') >= 0)
      return {color : '#80ccff', 'font-weight' : 'bold'}

      return {}
  }
}
