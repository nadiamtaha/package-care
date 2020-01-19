import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router';
import { BagsService } from '../bags.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-bags-list',
  templateUrl: './bags-list.component.html',
  styleUrls: ['./bags-list.component.css']
})
export class BagsListComponent implements OnInit {
  searchTxt;
  searchCriteria:any={
    pageSize:3,
    pageIndex:1,
    searchTxt:''
  }
  totalCount;
  currentIndex=0;
  vendorId;
  numbers;
  noOfPages:number;
  bagsList:any[];
  constructor(private _BagsService:BagsService,
    private router:Router,private spinner: NgxSpinnerService) { }

  ngOnInit() {

    if(!localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return;
    }
    this.spinner.show();

    this.getBagsList();
  }
  getBagsList(){
    this._BagsService.getBags(this.searchCriteria).subscribe(response=>{
      this.spinner.hide();

      this.bagsList=response.Data;
      console.log(this.bagsList)
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
    this.getBagsList()
  }
  getData(index){
    this.spinner.show();

    this.currentIndex=index;
    this.searchCriteria.pageIndex=this.currentIndex+1;
    this.getBagsList()

  }
  viewBag(id){
    this.router.navigateByUrl(`layout/bag/${id}`)
  }
}
