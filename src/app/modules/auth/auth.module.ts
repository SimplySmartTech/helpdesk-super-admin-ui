import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthLayoutRoutes } from './auth-layout.routing';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(AuthLayoutRoutes),
  ],providers: [
    AuthService
]
})
export class AuthModule { }
