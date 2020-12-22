import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
    MatCardModule,
    MatRippleModule,
    MatDialogModule,
    DragDropModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatRippleModule,
    DragDropModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ]
})
export class MaterialModule { }
