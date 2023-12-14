import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../core/services/api/api.service';
import { ModalQuestionsComponent } from './components/modal-questions/modal-questions.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss'
})
export class QuestionsComponent {
  isLoading: boolean = false;

  public opcaoStatus = [
    { status: true, descricao: 'Ativo' },
    { status: false, descricao: 'Inativo' },
  ];

  public opcaoDeletado = [
    { status: true, descricao: 'Sim' },
    { status: false, descricao: 'Não' },
  ];

  public paging: any = { index: 0, size: 10, length: 0 };
  grid: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'options',
    'codigo',
    'pergunta',
    'categoria',
    'dica',
    'dificuldade',
    'ativo',
  ];

  form: FormGroup = new FormGroup({
    ativo: new FormControl(true),
    deletado: new FormControl(false),
    nomeCategoria: new FormControl(''),
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
      paginacaoRequest: {
        paginaIndex: this.paging.index + 1,
        paginaTamanho: this.paging.size,
      },
    };
    this.service.post('v1/QuizPergunta/buscar-por-filtro', obj).subscribe({
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
    const dialogRef = this.dialog.open(ModalQuestionsComponent, {
      width: '700px',
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

