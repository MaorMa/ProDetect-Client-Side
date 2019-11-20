import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { HttpResponse, HttpResponseBase } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { timer } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  username: string;
  password: string;
  loginForm: FormGroup;
  loginError: boolean = false;
  isLoading: boolean = false;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  login(): void {
    this.isLoading = true;
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.loginService.login(this.username, this.password).subscribe(
      (resValue: any) => {
        if (resValue) {
          if (resValue['status'] === 200) {
            sessionStorage.setItem('token',resValue['body']);
            this.router.navigate(['user']);
            this.isLoading = false;
          }
        }
      },
      error => {
          this.loginError = true;
          this.isLoading = false;
          this.loginForm.reset();
          const t = timer(2000);
          t.subscribe(x => {
            this.loginError = false;
          })
      }
    );
  }
}



