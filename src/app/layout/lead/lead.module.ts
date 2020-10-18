import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadRoutingModule } from './lead-routing.module';
import { LeadListComponent } from './lead-list/lead-list.component';
import { LeadRegistrationComponent } from './lead-registration/lead-registration.component';
import { MatButtonModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [LeadListComponent, LeadRegistrationComponent],
  imports: [CommonModule, LeadRoutingModule, MatButtonModule, DragDropModule],
})
export class LeadModule {}
