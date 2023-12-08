import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { StorageService } from './services/storage/storage.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private router: Router, private route: ActivatedRoute) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = StorageService.getToken();
    const apiReq = req.clone({
      url: `${environment.api}${req.url}`,
      headers: req.headers.set('Authorization', 'Bearer ' + token || ''),
      withCredentials: false,
      responseType: 'json',
    });
    return next.handle(apiReq).pipe(
      catchError((error, caugth) => {
        console.log(error);
        this.handleAuthError(error);
        return of(error);
      }) as any
    );
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      console.log('handled error ' + error.status);

      let queryParams: any = { ...this.route.snapshot.queryParams };
      this.router.navigate(['/signin'], { queryParams });
      localStorage.clear();

      return of(error.message);
    } else if (error.status === 403) {
      this.router.navigate(['unauthorized']);
    }
    throw error;
  }
}
