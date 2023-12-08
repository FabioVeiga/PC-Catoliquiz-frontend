import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { StorageService } from '../../../core/services/storage/storage.service';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public logged_user = StorageService.getUsuario();
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.logged_user) this.router.navigate(['/painel']);
    else this.router.navigate(['signin']);
  }

  isLoading = false;
  hide = true;
  error = '';
  form: FormGroup = new FormGroup({
    apelidoOuEmail: new FormControl('', Validators.required),
    senha: new FormControl('', [Validators.required]),
  });

  loginUser() {
    localStorage.clear();
    this.isLoading = true;
    this.authService
      .authenticate(this.form.value)
      .pipe(
        catchError((error) => {
          this.handleLoginError(error);
          return throwError(error);
        })
      )
      .subscribe((response: any) => {
        StorageService.setUsuario(response.data);
        this.openSnackBar(response.message, 'OK', 3000, 'success-snackbar');
        this.router.navigate(['/']);
        this.isLoading = false;
      });
  }

  private handleLoginError(error: any): void {
    if (error.status === 400 && error.error) {
      const errorMessage = this.extractErrorMessage(error.error);
      this.openSnackBar(errorMessage, 'OK', 3000, 'alert-snackbar');
    } else if (error.status === 401) {
      this.openSnackBar('Credenciais inválidas', 'OK', 3000, 'alert-snackbar');
    } else if (error.status === 403) {
    } else {
      this.openSnackBar(
        'Erro ao processar a solicitação',
        'OK',
        3000,
        'alert-snackbar'
      );
    }
    this.isLoading = false;
  }

  private extractErrorMessage(error: any): string {
    const errorMessages = [];
    for (const key in error) {
      if (error.hasOwnProperty(key) && Array.isArray(error[key])) {
        errorMessages.push(...error[key]);
      }
    }
    return errorMessages.length > 0
      ? errorMessages.join('\n')
      : 'Erro de autenticação';
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  openSnackBar(
    message: string,
    action: string,
    duration: number,
    panelClass?: string
  ): any {
    this.snackBar.open(message, action, { duration, panelClass });
  }
}
