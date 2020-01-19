import { Router } from '@angular/router';
import { HotelsService } from './../hotels.service';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.css']
})
export class HotelsListComponent implements OnInit {

  constructor(private _HotelsService:HotelsService,
    private router:Router, private spinner: NgxSpinnerService) { }
  hotelsList:any[];
  searchTxt;
  showConfirmMsg:boolean=false;
  hotelId:any;  
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
    this.getHotelsList();
  }
  showDeleteConfirm(id){
    $('.content-overlay').css({opacity:"1",zIndex:"5"});
    $('.confirm-msg').css({opacity:"1",zIndex:"77"});
   this.showConfirmMsg=true;

   this.hotelId=id;
  }
  deleteHotel(){
    this._HotelsService.deleteHotel(this.hotelId).subscribe(response=>{
      this.getHotelsList();
      this.removeOverlay()
    })
  }
  getHotelsList(){
    this._HotelsService.getHotels(this.searchCriteria).subscribe(response=>{
      this.spinner.hide();

      this.hotelsList=response.Data;
      this.totalCount=response.RecordsCount
      if(response.RecordsCount>this.searchCriteria.pageSize)
       this.noOfPages=Math.ceil(response.RecordsCount/this.searchCriteria.pageSize);
      else
       this.noOfPages=1;

       this.numbers = Array(this.noOfPages).fill(0).map((x,i)=>i+1);
       
    })
  }
  navigateToEdit(id){
    this.router.navigateByUrl(`layout/hotel/${id}`)
  }
  getFilteredData(term){
    this.searchCriteria.searchTxt=term;
    this.getHotelsList()
  }
  getData(index){
    this.spinner.show();

    this.currentIndex=index;
    this.searchCriteria.pageIndex=this.currentIndex+1;
    this.getHotelsList()

  }
  removeOverlay(){
    $('.content-overlay').css({opacity:"0",zIndex:"-2"});
     this.showConfirmMsg=false
  }
}
