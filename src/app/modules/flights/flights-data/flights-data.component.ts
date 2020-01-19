import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { FlightsService } from './../flights.service';
import { Router, ActivatedRoute } from  '@angular/router';

import * as $ from 'jquery'

@Component({
  selector: 'app-flights-data',
  templateUrl: './flights-data.component.html',
  styleUrls: ['./flights-data.component.css']
})
export class FlightsDataComponent implements OnInit {
  public exampleData;
  addForm: FormGroup;
  isSubmitted  =  false;
  airlinesList:any[];
  airportsList:any[];
  showConfirmMsg=false;
  flightId:any;
  flight:any;
  airLinesSearchCriteria:any={
    pageIndex:1,
    searchTxt:''
  }
 

  airPortsSearchCriteria:any={
    pageIndex:1,
    searchTxt:''
  }
  constructor(private router: Router, private formBuilder: FormBuilder,
    private _FlightsService:FlightsService,private activeRoute:ActivatedRoute) { 

  }

  get formControls() { return this.addForm.controls; }


  ngOnInit() {
    
    this.activeRoute.paramMap.subscribe(params => {
      this.flightId = params.get("id")
    })

    if(this.flightId){
      this._FlightsService.getFlightById(this.flightId).subscribe(response=>{
        this.flight=response.Data;
        this.flight.ArrivalTime=this.flight.ArrivalTime.substring(0,this.flight.ArrivalTime.indexOf('T'))
        this.flight.DepartureTime=this.flight.DepartureTime.substring(0,this.flight.DepartureTime.indexOf('T'))

        this.addForm.controls['Number'].setValue(this.flight.Number);
        this.addForm.controls['AirLineId'].setValue(this.flight.AirLineId);
        this.addForm.controls['FromAirPortId'].setValue(this.flight.FromAirPortId);
        this.addForm.controls['ToAirPortId'].setValue(this.flight.ToAirPortId);
        this.addForm.controls['DepartureTime'].setValue(this.flight.DepartureTime);
        this.addForm.controls['ArrivalTime'].setValue(this.flight.ArrivalTime);


      })


    }
    this.getAirlinesList();
    this.getAirportsList();

    this.addForm  =  this.formBuilder.group({
      Number: ['', Validators.required],
      AirLineId: ['', Validators.required],
      FromAirPortId: ['', Validators.required],
      ToAirPortId: ['', Validators.required],
      DepartureTime: ['', Validators.required],
      ArrivalTime: ['', Validators.required],


  });
}
removeOverlay(){
  $('.content-overlay').css({opacity:"0"});
   this.showConfirmMsg=false
}
  addFlight(){
    $('.content-overlay').css({opacity:"1",zIndex:"5"});
    $('.confirm-msg').css({opacity:"1",zIndex:"77"});

    this.showConfirmMsg=true;
    this.isSubmitted = true;
    if(this.addForm.invalid){
      return;
    }
    if(!this.flightId){
      this._FlightsService.addFlight(this.addForm.value).subscribe({next:response=>{
        console.log(response);
        this.showConfirmMsg=true;

      },
      error:err=>{
        console.log(err.error);
        
      }
      })
    }
    else{
      this.addForm.value.id=this.flightId;
      this._FlightsService.updateFlight(this.addForm.value).subscribe({next:response=>{
        this.removeOverlay();
        this.router.navigate(['/layout/flights']);

      },
      error:err=>{
        console.log(err.error);
        
      }
      })
    }
  }

  getAirlinesList(){
    this._FlightsService.getAirlinesList(this.airLinesSearchCriteria).subscribe(response=>{
      this.airlinesList=response.Data;
      console.log(this.airlinesList)
    })
  }
  
  getAirportsList(){
    this._FlightsService.getAirportsList(this.airPortsSearchCriteria).subscribe(response=>{
      this.airportsList=response.Data;
      console.log(this.airportsList)

    })
  }
}
