import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageRoutingModule } from './login-page-routing.module';

import { LoginPageComponent } from './login-page.component';
import { ComponentsModule } from '../../../components/components.module';
import { MaterialModule } from '../../../services/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginSelectComponent } from './components/login-select/login-select.component';
import { TextWrapDirective } from '../../../directives/text-wrap/text-wrap.directive';

@NgModule({
  declarations: [LoginPageComponent, LoginSelectComponent, TextWrapDirective],
  imports: [CommonModule, ComponentsModule, LoginPageRoutingModule, MaterialModule, ReactiveFormsModule]
})
export class LoginPageModule { }
