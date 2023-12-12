import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../../core/shared/shared.module';
import { UsersComponent } from './users/users.component';
import { ModalUsersComponent } from './users/components/modal-users/modal-users.component';
import { CategoriesComponent } from './categories/categories.component';
import { QuestionsComponent } from './questions/questions.component';
import { ModalCategoriesComponent } from './categories/components/modal-categories/modal-categories.component';
import { ModalQuestionsComponent } from './questions/components/modal-questions/modal-questions.component';

@NgModule({
  declarations: [
    HomeComponent,
    UsersComponent,
    ModalUsersComponent,
    CategoriesComponent,
    ModalCategoriesComponent,
    QuestionsComponent,
    ModalQuestionsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, AccountRoutingModule, SharedModule],
})
export class AccountModule {}
