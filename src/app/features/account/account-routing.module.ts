import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppHomeComponent } from '../../core/layout/home/layout-home.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: AppHomeComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'usuarios',
        component: UsersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
