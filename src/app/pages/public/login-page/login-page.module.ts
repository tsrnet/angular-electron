import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageRoutingModule } from './login-page-routing.module';

import { LoginPageComponent } from './login-page.component';
import { ComponentsModule } from '../../../components/components.module';
import { MaterialModule } from '../../../services/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, ComponentsModule, LoginPageRoutingModule, MaterialModule, ReactiveFormsModule]
})
export class LoginPageModule { }
