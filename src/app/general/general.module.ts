import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { GeneralRootComponent } from './general-root/general-root.component';
import { GeneralRoutingModule } from './general-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ShowActivityDetailsComponent } from './show-activity-details/show-activity-details.component';
import { ReservationComponent } from './reservation/reservation.component';
import { CommentsComponent } from './comments/comments.component';
import { DevsInfoComponent } from './devs-info/devs-info.component';
import { SeeLocationComponent } from './see-location/see-location.component';
import { ServicesComponent } from './services/services.component';
import { ShowCommentsComponent } from './show-comments/show-comments.component';
import { SocialNetworksComponent } from './social-networks/social-networks.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { SpecialOffersComponent } from './special-offers/special-offers.component';
import { MostVisitedActivitiesComponent } from './most-visited-activities/most-visited-activities.component';
import { MainImagesCarouselComponent } from './main-images-carousel/main-images-carousel.component';
import { ShowMainActivitiesComponent } from './show-main-activities/show-main-activities.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    GeneralRoutingModule
  ],
  declarations: [
    ContactUsComponent,
    GeneralRootComponent,
    HomeComponent,
    ShowActivityDetailsComponent,
    ReservationComponent,
    CommentsComponent,
    DevsInfoComponent,
    SeeLocationComponent,
    ServicesComponent,
    ShowCommentsComponent,
    SocialNetworksComponent,
    WhoWeAreComponent,
    SpecialOffersComponent,
    MostVisitedActivitiesComponent,
    MainImagesCarouselComponent,
    ShowMainActivitiesComponent
  ],
  exports: [
    GeneralRootComponent
  ],
  entryComponents: [
    DevsInfoComponent,
    SeeLocationComponent,
    ServicesComponent,
    ShowCommentsComponent,
    SocialNetworksComponent,
    WhoWeAreComponent,
    SpecialOffersComponent,
    MostVisitedActivitiesComponent,
    CommentsComponent
  ]
})
export class GeneralModule { }
