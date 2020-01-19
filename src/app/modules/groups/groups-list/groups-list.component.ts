import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { GroupsService } from '../groups.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  constructor(private _GroupsService:GroupsService,
    private router:Router, private spinner: NgxSpinnerService) { }
  selectedFlightId:number;
  flightNumbersList:any[];
  selectedStatusId:number;
  statusList:any[];
  selectedUserId:number;
  usersList:any[];
  searchCriteria:any={
    pageSize:3,
    pageIndex:1,
    flightNumber:'',
    userId:'',
    statusId:'',
    depTime:''
  }
  depTime;
  groupsList:any[];
  showConfirmMsg:boolean=false;
  GroupId:any;  
  totalCount;
  currentIndex=0;
  numbers;
  noOfPages:number;
  deleteGroup(){

  }
  removeOverlay(){
    
  }
searchInGroups(){
  this.searchCriteria.depTime=this.depTime
  console.log(this.searchCriteria)
}
navigateToEdit(id){
  this.router.navigateByUrl(`layout/group/${id}`)
}
  getGroupsList(){
      this._GroupsService.getGroups(this.searchCriteria).subscribe(response=>{
        this.spinner.hide();
        this.groupsList=response.Data;
        console.log(this.groupsList);
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
    this.getGroupsList()
  }

  getData(index){
    this.spinner.show();
    this.currentIndex=index;
    this.searchCriteria.pageIndex=this.currentIndex+1;
    this.getGroupsList()
  }

  ngOnInit() {
    if(!localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return;
    }
    this.spinner.show();
    this.getGroupsList();
    this.getFlightNumbersList();
    this.getStatusList();
    this.getUsersList()
  }
  getFlightNumbersList(){
    this._GroupsService.getFlightNumbers().subscribe(response=>{
      this.flightNumbersList=response.Data;
    })
  }
  
  onFlightNumChange(id){
    this.searchCriteria.flightNumber= id;
  }
  getStatusList(){
    this._GroupsService.getGroupStatusList().subscribe(response=>{
      this.statusList=response.Data;
    })
  }
  onStatusChange(id){
    this.searchCriteria.statusId= id;

  }
  getUsersList(){
    this._GroupsService.getUsersList().subscribe(response=>{
      
      this.usersList=response.Data;
    })
  }
  onUserChange(id){
    this.searchCriteria.userId= id;
  }
}
