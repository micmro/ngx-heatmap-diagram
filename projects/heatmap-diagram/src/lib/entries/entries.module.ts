import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntriesComponent } from './entries.component';
import { EntryComponent } from './entry/entry.component';
import { TimeLabelComponent } from './time-label/time-label.component';

@NgModule({
  imports: [CommonModule],
  declarations: [EntriesComponent, EntryComponent, TimeLabelComponent],
  exports: [EntriesComponent]
})
export class EntriesModule {}
