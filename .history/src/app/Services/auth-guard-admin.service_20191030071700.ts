import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService {


  isAdmin: boolean = false;

  constructor(private http: HttpClient, private router: Router, private loginService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot): any {//TODO
    const role = route.data.role;
    var token = sessionStorage.getItem('token');
    this.loginService.isAdmin((token))
      .subscribe(
        (resValue: any) => {
          if (resValue) {
            this.isAdmin = resValue['body'] === true;
            if (this.isAdmin) {
              // console.log(role);
              // this.router.navigate([role]);
            }
          }
        },
        error => {
        });
    return this.isAdmin;
  }

}
