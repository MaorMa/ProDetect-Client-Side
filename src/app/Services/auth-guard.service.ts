import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  tokenValid: boolean = false;  
  
  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) { }
  
  canActivate(route: ActivatedRouteSnapshot): any {
    const role = route.data.role;
    var token = sessionStorage.getItem('token');
    this.loginService.isTokenValid((token))
    .subscribe(
      (resValue: any) => {
        if(resValue){
          this.tokenValid = resValue['body'] === true;
          if(this.tokenValid){
            // console.log(role);
            this.router.navigate([role]);
          }
        }
      },
        error => {
        });
      return this.tokenValid;
   }
   
}
