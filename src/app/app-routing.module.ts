import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './core/shared/components/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AboutUsComponent } from './features/about-us/about-us.component';
import { AppHomeComponent } from './core/layout/home/layout-home.component';
import { CheckAuthComponent } from './core/shared/components/check-auth/check-auth.component';
import { FaqComponent } from './features/faq/faq.component';

const routes: Routes = [
  {
    path: '',
    component: CheckAuthComponent,
  },
  {
    path: 'signin',
    loadChildren: () =>
      import('./features/signin/signin.module').then((mod) => mod.SigninModule),
  },
  {
    path: 'painel',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/account/account.module').then(
        (mod) => mod.AccountModule
      ),
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {}
