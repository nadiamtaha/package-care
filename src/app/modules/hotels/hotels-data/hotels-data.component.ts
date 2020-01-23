import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router, ActivatedRoute } from  '@angular/router';
import { HotelsService } from './../hotels.service';
import * as $ from 'jquery'

@Component({
  selector: 'app-hotels-data',
  templateUrl: './hotels-data.component.html',
  styleUrls: ['./hotels-data.component.css']
})
export class HotelsDataComponent implements OnInit {
  searchTxt;
  addForm: FormGroup;
  isSubmitted  =  false;
  showConfirmMsg=false;
  citiesList:any[];
  selectedCityId:number;
  hotelId:any;
  hotel:any;

  constructor(private _HotelsService:HotelsService,private activeRoute:ActivatedRoute,private router: Router, private formBuilder: FormBuilder,
   ) { 
    this.getCitiesList();

  }
  
    
  get formControls() { return this.addForm.controls; }
  getCitiesList(){
    this._HotelsService.getCitiesList().subscribe(response=>{
      this.citiesList=response.Data;
    })
  }
  
  onCityChange(id){
    this.selectedCityId= id;
  }

 
  ngOnInit() {
   
    if(!localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return;
    }
    
    this.activeRoute.paramMap.subscribe(params => {
      this.hotelId = params.get("id")
    })


    if(this.hotelId){
      this._HotelsService.getHotelById(this.hotelId).subscribe(response=>{
        this.hotel=response.Data;
        console.log(this.hotel)
        this.addForm.controls['name'].setValue(this.hotel.Name);
        this.addForm.controls['code'].setValue(this.hotel.Code);
        this.addForm.controls['latitude'].setValue(this.hotel.Latitude);
        this.addForm.controls['longitude'].setValue(this.hotel.Longitude);
        this.addForm.controls['cityId'].setValue(this.hotel.CityId);

      })


    }


    this.addForm  =  this.formBuilder.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      cityId: ['', Validators.required],
  });
 
}

removeOverlay(){
  this.addForm.reset();
  $('.content-overlay').css({opacity:"0"});
   this.showConfirmMsg=false
}
  
submitHotel(){
    $('.content-overlay').css({opacity:"1",zIndex:"5"});
    $('.confirm-msg').css({opacity:"1",zIndex:"77"});

    this.isSubmitted = true;
    if(this.addForm.invalid){
      return;
    }
    this.addForm.value.cityId=parseInt(this.addForm.value.cityId)
    if(!this.hotelId){
      this._HotelsService.addHotel(this.addForm.value).subscribe({next:response=>{
        console.log(response);
        this.showConfirmMsg=true;

      },
      error:err=>{
        console.log(err.error);
        
      }
      })
    }
    else{
      this.addForm.value.id=this.hotelId;
      this._HotelsService.updateHotel(this.addForm.value).subscribe({next:response=>{
        this.removeOverlay();
        this.router.navigate(['/layout/hotels']);

      },
      error:err=>{
        console.log(err.error);
        
      }
      })
    }
  }
}
