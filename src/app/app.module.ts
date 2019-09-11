import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { NgModule } from '@angular/core'
import { Error404Component } from './errors/404.component'
import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventListResolver
} from './events/index'
import { NavBarComponent } from './nav/navbar.component'
import { EventsAppComponent } from './events-app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'
import { appRoutes } from '../routes'
import { AuthService } from './user/auth.service'

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    NavBarComponent,
    Error404Component
  ],
  providers: [
    EventService,
    EventRouteActivator,
    EventListResolver,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    },
    AuthService
  ],
  bootstrap: [ EventsAppComponent ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty)
    return window.confirm('You have not saved this event, do you really want to cancel ?')
  return true;
}
