import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { autheticationComponent } from './authetication/authetication.component';
import { ValidCodComponent } from './valid-cod/valid-cod.component';
import { SetPasswordComponent } from './set-password/set-password.component';

const routes: Routes = [
  {
    path: '',
    component: autheticationComponent
  },
  {
    path: 'valid-code/:userId',
    component: ValidCodComponent
  },
  {
    path: 'change-password/:userId',
    component: SetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgetPasswordRoutingModule { }
