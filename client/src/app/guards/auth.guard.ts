import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  auth: boolean;

  constructor(private _authService: AuthService, private router: Router){ }

  canActivate() {
    if (this._authService.isLoggedIn()) {
      this.auth = true;
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }

  }
  
}
