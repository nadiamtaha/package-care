import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router ,ActivatedRoute} from  '@angular/router';

import * as $ from 'jquery'
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-data',
  templateUrl: './users-data.component.html',
  styleUrls: ['./users-data.component.css']
})
export class UsersDataComponent implements OnInit {
  searchTxt;
  
  addForm: FormGroup;
  isSubmitted  =  false;
  showConfirmMsg=false;
  rolesList;
  selectedRoleType;
  userId:any;
  user:any;
  constructor(private _UsersService:UsersService,private activeRoute:ActivatedRoute,private router: Router, private formBuilder: FormBuilder,
    ) { 
      this.getRolesList();

  }
  
  get formControls() { return this.addForm.controls; }
  getRolesList(){
    this._UsersService.getRolesList().subscribe(response=>{
      this.rolesList=response.Data;
    })
  }
  onRoleChange(type){
    this.selectedRoleType= type;
  }

  ngOnInit() {
   
    if(!localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return;
    }
    
    this.activeRoute.paramMap.subscribe(params => {
      this.userId = params.get("id")
    })


    if(this.userId){
      this._UsersService.getUserById(this.userId).subscribe(response=>{
        this.user=response.Data;
        console.log(this.user)
        this.addForm.controls['DisplayName'].setValue(this.user.DisplayName);
        this.addForm.controls['file'].setValue(this.user.file);
        this.addForm.controls['Email'].setValue(this.user.Email);
        this.addForm.controls['Mobile'].setValue(this.user.Mobile);
        this.addForm.controls['Password'].setValue(this.user.password);
        this.addForm.controls['ConfirmPassword'].setValue(this.user.ConfirmPassword);
        this.addForm.controls['UserType'].setValue(this.user.UserTypeString);
      })


    }


    this.addForm  =  this.formBuilder.group({
      DisplayName: ['', Validators.required],
      file: [''],
      Email: ['', Validators.required],
      Mobile: ['', Validators.required],
      Password: [''],
      ConfirmPassword: [''],
      UserType: ['', Validators.required],


  });
 
}
 
removeOverlay(){
  $('.content-overlay').css({opacity:"0"});
   this.showConfirmMsg=false
}
  submitUser(){
    $('.content-overlay').css({opacity:"1",zIndex:"5"});
    $('.confirm-msg').css({opacity:"1",zIndex:"77"});

    this.isSubmitted = true;
    if(this.addForm.invalid){
      return;
    }

    const formData = new FormData();
    formData.append('file', this.addForm.value.file);
    formData.append('DisplayName', this.addForm.value.DisplayName);
    formData.append('Email', this.addForm.value.Email);
    formData.append('Mobile', this.addForm.value.Mobile);
    
    formData.append('UserType', this.addForm.value.UserType);

    //this.addForm.value.cityId=parseInt(this.addForm.value.cityId)
    if(!this.userId){
      formData.append('Password', this.addForm.value.Password);
      formData.append('ConfirmPassword',this.addForm.value.ConfirmPassword);
      this._UsersService.addUser(formData).subscribe({next:response=>{
        console.log(response);
        this.showConfirmMsg=true;

      },
      error:err=>{
        console.log(err.error);
        
      }
      })
    }
    else{
      formData.append('id', this.userId);

      this._UsersService.updateUser(formData).subscribe({next:response=>{
        this.removeOverlay();
        this.router.navigate(['/layout/users']);

      },
      error:err=>{
        console.log(err.error);
        
      }
      })
    }
  }
}
