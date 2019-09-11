import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from './shared/index'

@Component({
  template: `<div>
              <h1>Upcoming Training</h1>
              <hr/>
               <div class="row">
                <div *ngFor="let event of events" class="col-md-5">
                  <event-thumbnail (click)="handleThumbnailClick(event.name)" [event]="event"></event-thumbnail>
                </div>
               </div>
             </div>
             `
})

export class EventsListComponent implements OnInit {
    events: IEvent[];

    constructor(private eventService: EventService, private toastMsg: ToastrService,
      private route: ActivatedRoute) {
    }

    ngOnInit() {
      this.events = this.route.snapshot.data['events']
    }
    handleEventClicked(data) {
      console.log('Received:', data);
    }
    handleThumbnailClick(eventName) {
      this.toastMsg.success(eventName);
    }
}
