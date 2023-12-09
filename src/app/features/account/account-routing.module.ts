import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppHomeComponent } from '../../core/layout/home/layout-home.component';
import { UsersComponent } from './users/users.component';
import { CategoriesComponent } from './categories/categories.component';
import { QuestionsComponent } from './questions/questions.component';

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
      {
        path: 'categorias',
        component: CategoriesComponent,
      },
      {
        path: 'perguntas',
        component: QuestionsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
