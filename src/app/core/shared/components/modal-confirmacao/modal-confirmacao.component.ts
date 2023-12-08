import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ModalConfirmacao {
  textoCancelar: string;
  textoOk: string;
  textoRemove: string;
  exibirBtnRemover: boolean;
  titulo: string;
  texto?: string;
}

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.scss'],
})
export class ModalConfirmacaoComponent {
  textoOk = '';
  textoCancelar = '';
  textoRemove = '';

  titulo = 'Alerta!';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ModalConfirmacao,
    public snackBar: MatSnackBar,
    private dialog: MatDialogRef<ModalConfirmacaoComponent>
  ) {
    this.textoCancelar = data.textoCancelar || this.textoCancelar;
    this.textoOk = data.textoOk || this.textoOk;
    this.textoRemove = data.textoRemove || this.textoRemove;
    this.titulo = data.titulo || this.titulo;
  }

  next() {
    this.dialog.close(1);
  }

  remove() {
    this.dialog.close(2);
  }
}
