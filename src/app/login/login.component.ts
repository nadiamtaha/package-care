import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { AuthenticationService } from '../services/authenticaation.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted  =  false;
  constructor(private router: Router, private formBuilder: FormBuilder,
    private _AuthenticationService:AuthenticationService,
    private spinner: NgxSpinnerService,private toastr: ToastrService ) { 

  }

  get formControls() { return this.loginForm.controls; }

  login(){
    this.spinner.show();
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.loginForm.value.grant_type="password"
    this._AuthenticationService.login(this.loginForm.value).subscribe({next:response=>{
      localStorage.setItem('currentUser',JSON.stringify(response));

      this.router.navigateByUrl('/layout/dashboard');
    },
    error:err=>{
      this.toastr.error('Wrong user name or password!', 'Error !');
      console.log(err.error);
      
    }
    
    })
    this.spinner.hide();

    //this._AuthenticationService.login(this.loginForm.value);
  }

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],

    });
  }

}
