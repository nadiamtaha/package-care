import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router, ActivatedRoute } from  '@angular/router';
import * as $ from 'jquery'
import { VendorsService } from '../vendors.service';

@Component({
  selector: 'app-vendors-data',
  templateUrl: './vendors-data.component.html',
  styleUrls: ['./vendors-data.component.css']
})
export class VendorsDataComponent implements OnInit {

  
  addForm: FormGroup;
  isSubmitted  =  false;
  showConfirmMsg=false;
  vendorId:any;
  vendor:any;
  constructor(private activeRoute:ActivatedRoute,private router: Router, private formBuilder: FormBuilder,private _VendorsService:VendorsService) 
  { 
    
  }
  
  get formControls() { return this.addForm.controls; }


  ngOnInit() {
    if(!localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return;
    }

    this.activeRoute.paramMap.subscribe(params => {
      this.vendorId = params.get("id")
    })

    if(this.vendorId){
      this._VendorsService.getVendorById(this.vendorId).subscribe(response=>{
        this.vendor=response.Data;
        this.addForm.controls['name'].setValue(this.vendor.Name);
        this.addForm.controls['email'].setValue(this.vendor.Email);
        this.addForm.controls['address'].setValue(this.vendor.Address);

      })


    }

    this.addForm  =  this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      address: ['', Validators.required],
     

  });
}
removeOverlay(){
   $('.content-overlay').css({opacity:"0",zIndex:"-2"});
   this.showConfirmMsg=false;
   this.addForm.reset();
}

  sumbitVendor(){
    $('.content-overlay').css({opacity:"1",zIndex:"5"});
    $('.confirm-msg').css({opacity:"1",zIndex:"77"});

    this.showConfirmMsg=true;
    this.isSubmitted = true;
    if(this.addForm.invalid){
      return;
    }

    if(!this.vendorId){
      this._VendorsService.addVendor(this.addForm.value).subscribe({next:response=>{
        console.log(response);
        this.showConfirmMsg=true;

      },
      error:err=>{
        console.log(err.error);
        
      }
      })
    }
    else{
      this.addForm.value.id=this.vendorId;
      this._VendorsService.updateVendor(this.addForm.value).subscribe({next:response=>{
        console.log(response);
      },
      error:err=>{
        console.log(err.error);
        
      }
      })
    }
    
  }

}
