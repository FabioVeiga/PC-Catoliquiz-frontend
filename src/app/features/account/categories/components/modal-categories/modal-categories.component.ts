import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-categories',
  templateUrl: './modal-categories.component.html',
  styleUrl: './modal-categories.component.scss',
})
export class ModalCategoriesComponent {
  isLoading: boolean = false;
  info: any = [];
  hexColor: string = '#FFF';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      this.info = data;
      this.fillDetails(data);
      this.convertColor(data.corHexadecimal);
    }
  }

  form: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required),
    corHexadecimal: new FormControl('', Validators.required),
  });

  public fillDetails(data: any): void {
    this.form.patchValue({
      nome: data.nome,
      descricao: data.descricao,
      corHexadecimal: data.corHexadecimal,
    });
  }

  public convertColor(color: string) {
    const converted = '#' + color;
    return this.hexColor = converted;
  }
}
