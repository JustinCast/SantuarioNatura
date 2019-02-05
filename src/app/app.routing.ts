import { Routes } from "@angular/router";
import { LogguedInGuard } from "./loggued-in.guard";
import { AdminRootComponent } from "./admin/admin-root/admin-root.component";
import { GeneralRootComponent } from "./general/general-root/general-root.component";

export const ROUTES: Routes = [
  { path: 'admin', component: AdminRootComponent, /*canActivate: [LogguedInGuard]*/ },
  { path: 'general', component: GeneralRootComponent},
  { path: '', redirectTo: 'general', pathMatch: 'full'}
];
