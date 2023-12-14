import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../core/services/api/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalUsersComponent } from './components/modal-users/modal-users.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  isLoading: boolean = false;

  public opcaoStatus = [
    { status: true, descricao: 'Ativo' },
    { status: false, descricao: 'Inativo' },
  ];

  public opcaoBanido = [
    { status: true, descricao: 'Sim' },
    { status: false, descricao: 'Não' },
  ];

  public opcaoDeletado = [
    { status: true, descricao: 'Sim' },
    { status: false, descricao: 'Não' },
  ];

  public paging: any = { index: 0, size: 10, length: 0 };
  grid: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'options',
    'nome',
    'apelido',
    'email',
    'nota',
    'role',
    'codigo',
    'banido',
    'ativo',
  ];

  form: FormGroup = new FormGroup({
    ativo: new FormControl(true),
    deletado: new FormControl(false),
    nome: new FormControl(''),
    apelido: new FormControl(''),
    banido: new FormControl(false),
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
    this.service.post('v1/Usuario/buscar-lista-usuarios', obj).subscribe({
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

  details(data?: any) {
    const dialogRef = this.dialog.open(ModalUsersComponent, {
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
