import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import { TittleBarComponent } from './tittle-bar/tittle-bar.component';

@NgModule({
  declarations: [TittleBarComponent],
  imports: [CommonModule, TranslateModule, FormsModule],
  exports: [TranslateModule, FormsModule, TittleBarComponent]
})
export class ComponentsModule {}
