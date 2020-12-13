import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { FormsModule } from '@angular/forms';
import { TittleBarComponent } from './components/tittle-bar/tittle-bar.component';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, TittleBarComponent],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [TranslateModule, WebviewDirective, FormsModule, TittleBarComponent]
})
export class SharedModule {}
