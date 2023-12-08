import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-users',
  templateUrl: './modal-users.component.html',
  styleUrl: './modal-users.component.scss',
})

export class ModalUsersComponent {
  isLoading: boolean = false;
  info: any = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.info = data;
      this.fillDetails(data);
      this.form.disable();
    }
  }

  form: FormGroup = new FormGroup({
    nome: new FormControl(''),
    apelido: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    banido: new FormControl(''),
    codigo: new FormControl(''),
    ativo: new FormControl(''),
    dataCriacao: new FormControl(''),
    dataAlteracao: new FormControl(''),
    dataExclusao: new FormControl(''),
    nota: new FormControl(''),
  });

  public fillDetails(data: any): void {
    this.form.patchValue({
      nome: data.nome,
      apelido: data.apelido,
      email: data.email,
      role: data.role,
      banido: data.banido,
      codigo: data.codigo,
      ativo: data.ativo,
      dataCriacao: data.dataCriacao,
      dataAlteracao: data.dataAleracao,
      dataExclusao: data.dataExclusao,
      nota: data.nota,
    });
  }
}
