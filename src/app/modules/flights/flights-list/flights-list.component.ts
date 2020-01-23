import { FlightsService } from './../flights.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-flights-list',
  templateUrl: './flights-list.component.html',
  styleUrls: ['./flights-list.component.css']
})
export class FlightsListComponent implements OnInit {

  constructor(private _FlightsService:FlightsService,
    private router:Router, private spinner: NgxSpinnerService) { }
  searchTxt;
  flightNumber:any;
  flightsList:any[];
  showConfirmMsg:boolean=false;
  flightId:any;  
  totalCount;
  currentIndex=0;
  numbers;
  noOfPages:number;
  searchCriteria:any={
    pageSize:3,
    pageIndex:1,
    searchTxt:''
  }
  ngOnInit() {
    if(!localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return;
    }
    this.spinner.show();
   
    this.getFlightsList();
  }
  showDeleteConfirm(id,number){
    $('.content-overlay').css({opacity:"1",zIndex:"5"});
    $('.confirm-msg').css({opacity:"1",zIndex:"77"});
   this.showConfirmMsg=true;
   this.flightNumber=number;
   this.flightId=id;
  }
  deleteFlight(){
    this._FlightsService.deleteFlight(this.flightId).subscribe(response=>{
      this.getFlightsList();
      this.removeOverlay()
    })
  }
  getFlightsList(){
    this._FlightsService.getFlights(this.searchCriteria).subscribe(response=>{
      this.spinner.hide();
      this.flightsList=response.Data;
      this.totalCount=response.RecordsCount
      if(response.RecordsCount>this.searchCriteria.pageSize)
       this.noOfPages=Math.ceil(response.RecordsCount/this.searchCriteria.pageSize);
      else
       this.noOfPages=1;

       this.numbers = Array(this.noOfPages).fill(0).map((x,i)=>i+1);
    })
  }
  navigateToEdit(id){
    this.router.navigateByUrl(`layout/flight/${id}`)
  }
  getFilteredData(term){
    this.searchCriteria.searchTxt=term;
    this.getFlightsList()
  }
  getData(index){
    this.spinner.show();

    this.currentIndex=index;
    this.searchCriteria.pageIndex=this.currentIndex+1;
    this.getFlightsList()

  }
  removeOverlay(){
    $('.content-overlay').css({opacity:"0",zIndex:"-2"});
     this.showConfirmMsg=false
  }
}
