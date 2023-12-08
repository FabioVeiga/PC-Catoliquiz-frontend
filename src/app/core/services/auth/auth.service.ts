import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true,
};

export class User {
  auth_Token!: string;
  id!: string;
  company_id!: number;
  is_admin!: boolean;
  company_logo!: string;
  company_name!: string;
  company_rule!: boolean;
}

export class UserInput {
  email?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  authenticate(credentials: unknown): Observable<unknown> {
    return this.http.post('v1/Autenticar', credentials, httpOptions);
  }

  setState(data: any) {
    StorageService.setUsuario(data);
  }

  setAccessToken(at: string) {
    StorageService.setToken(at);
  }

  isAuthenticated() {
    return !!StorageService.getToken();
  }

  logout() {
    StorageService.deleteUsuario();
    this.router.navigate(['/']);
  }
}
