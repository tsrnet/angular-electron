import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageRoutingModule } from './login-page-routing.module';

import { LoginPageComponent } from './login-page.component';
import { LoginPageService } from './login-page.service';
import { ComponentsModule } from '../../../components/components.module';
import { MaterialModule } from '../../../services/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TextWrapDirective } from '../../../directives/text-wrap/text-wrap.directive';
import { LoginUserCardComponent } from './components/login-component/login-user-card/login-user-card.component';
import { SigninFormComponent } from './components/signin-form/signin-form.component';
import { LoginFormComponent } from './components/login-component/login-form/login-form.component';
import { LoginSelectComponent } from './components/login-component/login-select/login-select.component';
import { ConfirmDialog } from './components/login-component/login-select/templates/dialog-confirm.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';

@NgModule({
  declarations: [LoginPageComponent, LoginSelectComponent, TextWrapDirective, LoginUserCardComponent, ConfirmDialog, LoginFormComponent, SigninFormComponent, LoginComponentComponent ],
  imports: [CommonModule, ComponentsModule, LoginPageRoutingModule, MaterialModule, ReactiveFormsModule],
  exports: [LoginPageService]
})
export class LoginPageModule { }
