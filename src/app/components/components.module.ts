import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { TittleBarComponent } from './tittle-bar/tittle-bar.component';
import { TsrButtonComponent } from './tsr-components/tsr-button/tsr-button.component';

@NgModule({
  declarations: [TittleBarComponent, TsrButtonComponent],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [TranslateModule, FormsModule, TittleBarComponent, TsrButtonComponent]
})
export class ComponentsModule {}
