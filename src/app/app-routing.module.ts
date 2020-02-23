import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuardService as AuthGuard } from './Services/auth-guard.service';
import { UserPageComponent } from './user-page/user-page.component';
import { ReceiptAcceptComponent } from './admin-page/receipt-accept/receipt-accept.component';
import { ReceiptViewComponent } from './admin-page/receipt-view/receipt-view.component';
import { AuthGuardGlobalAdminService } from './Services/auth-guard-global-admin.service';
import { AddFamilyComponent } from './admin-page/add-family/add-family.component';
import { StatisticsComponent } from './admin-page/statistics/statistics.component';
import { AuthGuardAdminService } from './Services/auth-guard-admin.service';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'user', component: UserPageComponent, canActivate: [AuthGuard], data: { role: 'user' } },
  { path: 'receiptsAccept', component: ReceiptAcceptComponent, canActivate: [AuthGuardAdminService], data: { role: 'receiptsAccept' } },
  { path: 'receiptsView', component: ReceiptViewComponent, canActivate: [AuthGuard], data: { role: 'receiptsView' } },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard], data: { role: 'statistics' } },
  { path: 'addFamily', component: AddFamilyComponent, canActivate: [AuthGuardGlobalAdminService], data: { role: 'addFamily' } },
  { path: '**', redirectTo: '', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
