import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../../core/shared/shared.module';
import { UsersComponent } from './users/users.component';
import { ModalUsersComponent } from './users/components/modal-users/modal-users.component';

@NgModule({
  declarations: [HomeComponent, UsersComponent, ModalUsersComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, AccountRoutingModule, SharedModule],
})
export class AccountModule {}
