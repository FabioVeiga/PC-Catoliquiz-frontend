import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../../../core/services/api/api.service';
import { ModalCategoriesComponent } from '../../../categories/components/modal-categories/modal-categories.component';

@Component({
  selector: 'app-modal-questions',
  templateUrl: './modal-questions.component.html',
  styleUrl: './modal-questions.component.scss',
})
export class ModalQuestionsComponent implements OnInit {
  isLoading: boolean = false;
  categories: any;
  info: any = null;

  public quizDificuldade = [
    { status: 1, descricao: '1' },
    { status: 2, descricao: '2' },
    { status: 3, descricao: '3' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: ApiService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialogRef<ModalCategoriesComponent>
  ) {
    if (data) {
      this.info = data;
      this.fillDetails(data);
    }
  }

  ngOnInit(): void {
    this.getCategories();
  }

  form: FormGroup = new FormGroup({
    pergunta: new FormControl('', Validators.required),
    quizNivelDificuldade: new FormControl(0, Validators.required),
    categoria: new FormControl(0, Validators.required),
    dica: new FormControl('', Validators.required),
    respostas: this.fb.array([
      this.createResposta('', true),
      this.createResposta('', false),
      this.createResposta('', false),
      this.createResposta('', false),
    ]),
  });

  public async fillDetails(data: any) {
    this.isLoading = true;
    return this.form.patchValue({
      pergunta: data.pergunta,
      quizNivelDificuldade: data.quizNivelDificuldade,
      categoria: data.quizCategoria.codigo,
      dica: data.quizDica.descricao,
      respostas: data.quizRespostas,
    });
  }

  createResposta(
    resposta: string,
    correta: boolean = false,
    codigo?: number,
    quizRespostaPeso?: any
  ) {
    return this.fb.group({
      codigo: this.info === null ? null : codigo,
      resposta: [resposta, Validators.required],
      correta: correta,
      quizRespostaPeso: [quizRespostaPeso, Validators.required],
    });
  }

  get respostasFormArray() {
    return this.form.get('respostas') as FormArray;
  }

  isRespostaCorreta(index: number): boolean {
    return index === 0;
  }

  public getCategories() {
    this.service.get('v1/QuizCategoria/buscar-todos').subscribe({
      next: (response: any) => {
        this.categories = response.data.filter((x: any) => x.ativo === true);
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

  public save() {
    this.isLoading = true;
    if (this.info != null) {
      this.edit();
    } else {
      this.create();
    }
  }

  public create() {
    const obj = {
      pergunta: this.form.value.pergunta,
      quizNivelDificuldade: this.form.value.quizNivelDificuldade,
      dica: {
        descricao: this.form.value.dica,
      },
      categoria: {
        codigo: this.form.value.categoria,
      },
      respostas: this.form.value.respostas,
    };
    this.service.post('v1/QuizPergunta/inserir', obj).subscribe({
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
      pergunta: this.form.value.pergunta,
      quizNivelDificuldade: this.form.value.quizNivelDificuldade,
      dica: {
        codigo: this.info.quizDica.codigo,
        descricao: this.form.value.dica,
      },
      categoria: {
        codigo: this.form.value.categoria,
      },
      respostas: this.form.value.respostas,
    };
    this.service
      .put(`v1/QuizPergunta/alterar?codigo=${this.info.codigo}`, obj)
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
