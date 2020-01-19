import { Component, OnInit } from '@angular/core';
import { VendorsService } from '../vendors.service';
import { Router } from  '@angular/router';
import * as $ from 'jquery'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-vendors-list',
  templateUrl: './vendors-list.component.html',
  styleUrls: ['./vendors-list.component.css']
})
export class VendorsListComponent implements OnInit {
  constructor(private _VendorsService:VendorsService,
    private router:Router,private spinner: NgxSpinnerService) { }
  showConfirmMsg:boolean=false;
  activeLink:boolean=true;
  vendorsList:any[];
  totalCount;
  currentIndex=0;
  vendorId;
  numbers;
  searchTxt;
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
    this.getVendorsList();
  }
  showDeleteConfirm(id){
    $('.content-overlay').css({opacity:"1",zIndex:"5"});
    $('.confirm-msg').css({opacity:"1",zIndex:"77"});
   this.showConfirmMsg=true;

   this.vendorId=id;
  }

  deleteVendor(){
    this._VendorsService.deleteVendor(this.vendorId).subscribe(response=>{
      console.log(response);
      this.getVendorsList();
      this.removeOverlay()
    })
  }
  navigateToEdit(id){
    this.router.navigateByUrl(`layout/vendor/${id}`)
  }
  getVendorsList(){
    this._VendorsService.getVendors(this.searchCriteria).subscribe(response=>{
      this.spinner.hide();
      this.vendorsList=response.Data;
      this.totalCount=response.RecordsCount
      if(response.RecordsCount>this.searchCriteria.pageSize)
       this.noOfPages=Math.ceil(response.RecordsCount/this.searchCriteria.pageSize);
      else
       this.noOfPages=1;

       this.numbers = Array(this.noOfPages).fill(0).map((x,i)=>i+1);
       
    })
  }
  getFilteredData(term){
    this.searchCriteria.searchTxt=term;
    this.getVendorsList()
  }
  getData(index){
    this.spinner.show();
    this.currentIndex=index;
    this.searchCriteria.pageIndex=this.currentIndex+1;
    this.getVendorsList()

  }
  removeOverlay(){
    $('.content-overlay').css({opacity:"0",zIndex:"-2"});
     this.showConfirmMsg=false
  }
}
