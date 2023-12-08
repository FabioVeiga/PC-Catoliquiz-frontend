import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetPasswordRoutingModule } from './forget-password-routing.module';
import { SharedModule } from '../../../core/shared/shared.module';
import { autheticationComponent } from './authetication/authetication.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ValidCodComponent } from './valid-cod/valid-cod.component';

@NgModule({
  declarations: [
    autheticationComponent,
    ValidCodComponent,
    SetPasswordComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, SharedModule, ForgetPasswordRoutingModule],
})
export class ForgetPasswordModule {}
