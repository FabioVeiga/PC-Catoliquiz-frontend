import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../core/services/api/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-categories',
  templateUrl: './modal-categories.component.html',
  styleUrl: './modal-categories.component.scss',
})
export class ModalCategoriesComponent {
  isLoading: boolean = false;
  info: any = null;
  hexColor: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: ApiService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialogRef<ModalCategoriesComponent>
  ) {
    if (data) {
      this.info = data;
      this.fillDetails(data);
    }
  }

  form: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    corHexadecimal: new FormControl('', Validators.required),
  });

  public fillDetails(data: any): void {
    this.hexColor = this.convertColor(data.corHexadecimal);
    this.form.patchValue({
      nome: data.nome,
      descricao: data.descricao,
      corHexadecimal: this.hexColor,
    });
  }

  public convertColor(color: string) {
    const converted = '#' + color;
    return converted;
  }

  save() {
    this.isLoading = true;
    if (this.info != null) {
      this.edit();
    } else {
      this.create();
    }
  }

  public create() {
    const obj = {
      nome: this.form.value.nome,
      descricao: this.form.value.descricao,
      corHexadecimal: this.form.value.corHexadecimal.replace('#', ''),
    };
    this.service.post('v1/QuizCategoria/inserir', obj).subscribe({
      next: (response: any) => {
        if (response.status === 200) {
          this.openSnackBar(response.message, 'OK', 5000, 'success-snackbar');
          this.dialog.close();
        } else {
          return this.openSnackBar(
            'Erro: ' + response.message,
            'OK',
            5000,
            'danger-snackbar'
          );
        }
      },
      error: (error: HttpErrorResponse) => {
        this.openSnackBar(
          'Erro: ' + error.error.errorMessage,
          'OK',
          5000,
          'danger-snackbar'
        );
        console.error(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  public edit() {
    const obj = {
      nome: this.form.value.nome,
      descricao: this.form.value.descricao,
      corHexadecimal: this.form.value.corHexadecimal.replace('#', ''),
    };
    this.service
      .put(`v1/QuizCategoria/alterar?codigo=${this.info.codigo}`, obj)
      .subscribe({
        next: (response: any) => {
          if (response.status === 200) {
            this.openSnackBar(response.message, 'OK', 5000, 'success-snackbar');
            this.dialog.close();
          } else {
            return this.openSnackBar(
              'Erro: ' + response.message,
              'OK',
              5000,
              'danger-snackbar'
            );
          }
        },
        error: (error: HttpErrorResponse) => {
          this.openSnackBar(
            'Erro: ' + error.error.errorMessage,
            'OK',
            5000,
            'danger-snackbar'
          );
          console.error(error);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  openSnackBar(
    message: string,
    action: string,
    duration: number,
    panelClass?: string
  ): any {
    this._snackBar.open(message, action, { duration, panelClass });
  }
}
