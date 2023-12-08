import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HammerModule } from '@angular/platform-browser';
import { AppMaterialModule } from './material/app-material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import ptBR from '@angular/common/locales/pt';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PtBrPaginatorIntl } from './helpers/pt-br-paginator-intl';
import {
  MAT_DATE_FORMATS,
  MAT_RIPPLE_GLOBAL_OPTIONS,
} from '@angular/material/core';
import { PaginacaoComponent } from './components/paginacao/paginacao.component';
import { ModalConfirmacaoComponent } from './components/modal-confirmacao/modal-confirmacao.component';
import { CpfCnpjPipe } from './pipes/cpfCnpj.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { LogoComponent } from './components/logo/logo.component';
import { globalRippleConfig } from '../core.module';

registerLocaleData(ptBR, 'pt-BR');
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@NgModule({
  imports: [
    RouterModule,
    AppMaterialModule,
    CommonModule,
    DragDropModule,
    HammerModule,
    FormsModule,
    ReactiveFormsModule,
    CdkTableModule,
  ],
  declarations: [
    PaginacaoComponent,
    ModalConfirmacaoComponent,
    CpfCnpjPipe,
    LoaderComponent,
    LogoComponent,
  ],
  exports: [
    AppMaterialModule,
    RouterModule,
    CommonModule,
    DragDropModule,
    HammerModule,
    FormsModule,
    ReactiveFormsModule,
    CdkTableModule,
    PaginacaoComponent,
    ModalConfirmacaoComponent,
    CpfCnpjPipe,
    LoaderComponent,
    LogoComponent,
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MatPaginatorIntl, useValue: PtBrPaginatorIntl() },
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },
  ],
})
export class SharedModule {}
