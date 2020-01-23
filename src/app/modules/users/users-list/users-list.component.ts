import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  usersList:any[];
  showConfirmMsg:boolean=false;
  userId:any;  
  userName:any;
  totalCount;
  currentIndex=0;
  numbers;
  noOfPages:number;
  searchTxt;
  searchCriteria:any={
    pageSize:3,
    pageIndex:1,
    searchTxt:''
  }
  constructor(private router:Router,
    private _UsersService:UsersService,private spinner: NgxSpinnerService) { }
  showDeleteConfirm(id,name){
    $('.content-overlay').css({opacity:"1",zIndex:"5"});
    $('.confirm-msg').css({opacity:"1",zIndex:"77"});
   this.showConfirmMsg=true;
   this.userName=name;
   this.userId=id;
  }
  deleteUser(){
    this._UsersService.deleteUser(this.userId).subscribe(response=>{
      this.getUsersList();
      this.removeOverlay()
    })
  }
  navigateToEdit(id){
    this.router.navigateByUrl(`layout/user/${id}`)
  }
  getFilteredData(term){
    this.searchCriteria.searchTxt=term;
    this.getUsersList()
  }
  getData(index){
    this.spinner.show();

    this.currentIndex=index;
    this.searchCriteria.pageIndex=this.currentIndex+1;
    this.getUsersList()

  }
  getUsersList(){
    this._UsersService.getUsers(this.searchCriteria).subscribe(response=>{
      this.spinner.hide();

      this.usersList=response.Data;
      console.log(this.usersList)
      this.totalCount=response.RecordsCount
      if(response.RecordsCount>this.searchCriteria.pageSize)
       this.noOfPages=Math.ceil(response.RecordsCount/this.searchCriteria.pageSize);
      else
       this.noOfPages=1;

       this.numbers = Array(this.noOfPages).fill(0).map((x,i)=>i+1);
       
    })
  }
  removeOverlay(){
    $('.content-overlay').css({opacity:"0",zIndex:"-2"});
     this.showConfirmMsg=false
  }
  ngOnInit() {

    if(!localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return;
    }
    this.spinner.show();

    this.getUsersList();

  }

}
