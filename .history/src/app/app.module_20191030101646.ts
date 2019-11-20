import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { HttpClientModule } from '@angular/common/http';
import { FileUploadService } from './Services/file-upload.service';
import { GetSettingsService } from './Services/get-settings.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuardService as AuthGuard } from './Services/auth-guard.service';

//Material
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatInputModule, MatCardModule, MatTableModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { ReceiptAcceptComponent } from './admin-page/receipt-accept/receipt-accept.component';
import { AdminTableComponent } from './admin-page/receipt-accept/admin-table/admin-table.component';
import { AdminUpdateComponent } from './admin-page/receipt-accept/admin-table/admin-update/admin-update.component';
import { AdminCreateComponent } from './admin-page/receipt-accept/admin-table/admin-create/admin-create.component';
import { ReceiptViewComponent } from './admin-page/receipt-view/receipt-view.component';
import { ViewTableComponent } from './admin-page/receipt-view/view-table/view-table.component';
import { AddFamilyComponent } from './admin-page/add-family/add-family.component';
import { LoadingSpinnerComponent } from './login-page/loading-spinner/loading-spinner.component';
import { baseURLService } from './Services/base-urlservice.service';

@NgModule({
  declarations: [
    AppComponent,
    UserPageComponent,
    AdminTableComponent,
    AdminUpdateComponent,
    AdminCreateComponent,
    LoginPageComponent,
    ReceiptAcceptComponent,
    ReceiptViewComponent,
    ViewTableComponent,
    AddFamilyComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFileUploaderModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxImageZoomModule.forRoot(),
    //Material
    MatTabsModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatIconModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    //Login
    MatCardModule,
    MatTableModule,
    MatMenuModule,
  ],
  providers: [FileUploadService, GetSettingsService, AuthGuard, BaseURLService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [baseURLService],
      useFactory: (baseURLService: baseURLService) => {
        return () => {
          //Make sure to return a promise!
          return baseURLService.getBaseURL();
        };
      }
    }],
  bootstrap: [AppComponent],
  entryComponents: [AdminUpdateComponent, AdminCreateComponent]
})
export class AppModule { }
