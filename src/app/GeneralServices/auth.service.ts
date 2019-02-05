import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(public _http: HttpClient) {}

  login(user: User): void {
    localStorage.setItem("logguedUser", JSON.stringify(user));
  }

  logout(): any {
    localStorage.removeItem("logguedUser");
  }

  getUser(): any {
    return localStorage.getItem("logguedUser");
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}
export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];
