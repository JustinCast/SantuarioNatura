import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { GeneralRootComponent } from "./general-root/general-root.component";
import { HomeComponent } from "./home/home.component";
import { ReservationComponent } from "./reservation/reservation.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { ShowActivityDetailsComponent } from "./show-activity-details/show-activity-details.component";

const ROUTES: Routes = [
  {
    path: 'general',
    component: GeneralRootComponent,
    children: [
      { path: 'home', component: HomeComponent},
      { path: 'activity-details/:index', component: ShowActivityDetailsComponent},
      { path: 'reservation/:index', component: ReservationComponent}
    ]
  },
  {
    path: '',
    redirectTo: 'general/home',
    pathMatch: 'full'
  },
  {
    path:'contact-us',
    component: ContactUsComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
  declarations: []
})
export class GeneralRoutingModule {}
