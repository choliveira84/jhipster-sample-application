import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { ServidorComponent } from './servidor.component';
import { ServidorDetailComponent } from './servidor-detail.component';
import { ServidorUpdateComponent } from './servidor-update.component';
import { ServidorDeleteDialogComponent } from './servidor-delete-dialog.component';
import { servidorRoute } from './servidor.route';

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(servidorRoute)],
  declarations: [ServidorComponent, ServidorDetailComponent, ServidorUpdateComponent, ServidorDeleteDialogComponent],
  entryComponents: [ServidorDeleteDialogComponent],
})
export class JhipsterSampleApplicationServidorModule {}
