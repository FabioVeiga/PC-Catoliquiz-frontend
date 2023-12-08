import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninRoutingModule } from './signin-routing.module';
import { SharedModule } from '../../core/shared/shared.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, SharedModule, SigninRoutingModule],
})
export class SigninModule {}
