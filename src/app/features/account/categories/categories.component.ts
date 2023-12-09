import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../core/services/api/api.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalCategoriesComponent } from './components/modal-categories/modal-categories.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  isLoading: boolean = false;

  public opcaoStatus = [
    { status: '', descricao: 'Todos' },
    { status: true, descricao: 'Ativo' },
    { status: false, descricao: 'Inativo' },
  ];

  public opcaoDeletado = [
    { status: '', descricao: 'Todos' },
    { status: true, descricao: 'Sim' },
    { status: false, descricao: 'Não' },
  ];

  public paging: any = { index: 0, size: 10, length: 0 };
  grid: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'options',
    'codigo',
    'nome',
    'descricao',
    'corHexadecimal',
    'ativo',
  ];

  form: FormGroup = new FormGroup({
    ativo: new FormControl(true),
    deletado: new FormControl(false),
    nome: new FormControl(''),
  });

  constructor(
    public dialog: MatDialog,
    public service: ApiService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.isLoading = true;
    const obj = {
      ...this.form.value,
      paginacao: {
        paginaIndex: this.paging.index + 1,
        paginaTamanho: this.paging.size,
      },
    };
    this.service.post('v1/QuizCategoria/buscar-por-filtro', obj).subscribe({
      next: (response: any) => {
        this.grid.data = response.data.itens;
        response.data.itens.length
          ? (this.paging.length = response.data.totalItens)
          : null;
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

  edit(data?: any) {
    const dialogRef = this.dialog.open(ModalCategoriesComponent, {
      width: '540px',
      data: data,
    });
    dialogRef.afterClosed().subscribe((response) => {
      if (response !== 'cancel') {
        this.getAll();
      }
    });
  }

  onPageChange(evt: { pageIndex: number; pageSize: number }) {
    this.paging.index = evt.pageIndex;
    this.paging.size = evt.pageSize;
    this.getAll();
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
