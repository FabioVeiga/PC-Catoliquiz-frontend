/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(public router: Router) {}
  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    if (!StorageService.getUsuario()) {
      console.log(StorageService.getUsuario());
      return this.router.navigate(['signin']);
    }
    return true;
  }
}
