import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token');
    try {
      const decodedToken = decode(token);
      // User tries to go straignt to /home
      if (!this.auth.isLoggedIn && !decodedToken) {
        console.log('Invalid Token!');
        this.router.navigate(['/login']);
      }
    } catch (err) {
      console.log('Invalid Token!');
      // Not a validid token at all so let /register or /login to render
      this.router.navigate(['/login']);
    }

    return true;
  }
}
