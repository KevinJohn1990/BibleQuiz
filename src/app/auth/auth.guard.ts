import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }
  // canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
  //   if (!this.auth.isAuthenticated()) {
  //     console.log("Navigating to login");
  //     this.router.navigate(['login']);
  //     return false;
  //   }
  //   console.log("auth canload check success");
  //   return true;
  // }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.auth.isAuthenticated()) {
      console.log("Navigating to login");
      this.router.navigate(['login']);
      return false;
    }
    console.log("auth canactivate check success");
    return true;
  }
}