import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageRoutingModule } from './login-page-routing.module';

import { LoginPageComponent } from './login-page.component';
import { LoginPageService } from './login-page.service';
import { ComponentsModule } from '../../../components/components.module';
import { MaterialModule } from '../../../services/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginSelectComponent } from './components/login-select/login-select.component';
import { TextWrapDirective } from '../../../directives/text-wrap/text-wrap.directive';
import { LoginUserCardComponent } from './components/login-user-card/login-user-card.component';
import { LoginFormComponent } from './components/login-form/login-form/login-form.component';
import { ConfirmDialog } from './components/login-select/templates/dialog-confirm.component';

@NgModule({
  declarations: [LoginPageComponent, LoginSelectComponent, TextWrapDirective, LoginUserCardComponent, ConfirmDialog, LoginFormComponent ],
  imports: [CommonModule, ComponentsModule, LoginPageRoutingModule, MaterialModule, ReactiveFormsModule],
  exports: [LoginPageService]
})
export class LoginPageModule { }
