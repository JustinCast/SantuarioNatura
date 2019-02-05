import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './GeneralServices/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogguedInGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  /**
   *
   * @param next
   * @param state
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    console.log("canActivate", isLoggedIn);
    return isLoggedIn;
  }
}
