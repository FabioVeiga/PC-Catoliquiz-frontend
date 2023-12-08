import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppHomeComponent } from './core/layout/home/layout-home.component';
import { NotFoundComponent } from './core/shared/components/not-found/not-found.component';
import { AppMaterialModule } from './core/shared/material/app-material.module';
import { SharedModule } from './core/shared/shared.module';
import { AboutUsComponent } from './features/about-us/about-us.component';
import { FaqComponent } from './features/faq/faq.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHomeComponent,
    NotFoundComponent,
    AboutUsComponent,
    FaqComponent,
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    SharedModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
