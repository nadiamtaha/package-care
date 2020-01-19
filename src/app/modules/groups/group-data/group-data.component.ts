import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from  '@angular/router';
import { GroupsService } from '../groups.service';

@Component({
  selector: 'app-group-data',
  templateUrl: './group-data.component.html',
  styleUrls: ['./group-data.component.css']
})
export class GroupDataComponent implements OnInit {
  first=true;
  second=false;
  third=false;
  gpId:any;
  gpBasicData:any;
  gpFlightData:any;
  gpHotelData:any;
  gpDeliveryData:any;

  constructor(private activeRoute:ActivatedRoute,private _GroupsService:GroupsService,private router:Router) { 
    if(!localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return;
    }
    
    this.activeRoute.paramMap.subscribe(params => {
      this.gpId = params.get("id")
    })
    if(this.gpId){
     this.getGpBasicData();
     this.getGpHotelData();
    }
  }

  ngOnInit() {
   
  }

  getGpBasicData(){
    this._GroupsService.getGroupBasicData(this.gpId).subscribe(response=>{
      this.gpBasicData=response.Data;
      console.log(this.gpBasicData)
    })
  }
getGpHotelData(){
  this._GroupsService.getGroupHotelData(this.gpId).subscribe(response=>{
    this.gpHotelData=response.Data;
    console.log(this.gpHotelData)
  })
}
getGpFlightData(){
  this._GroupsService.getGroupFlightData(this.gpId).subscribe(response=>{
    this.gpFlightData=response.Data;
    console.log(this.gpFlightData)
  })
}
getGpDeliveryData(){
  this._GroupsService.getGroupsDeliveryDataById(this.gpId).subscribe(response=>{
    this.gpDeliveryData=response.Data;
    console.log(this.gpDeliveryData)
  })
}
  activeDiv(activeDiv){
    if(activeDiv=='first'){
      this.first=true;
      this.second=false;
      this.third=false;
      this.getGpBasicData();
      this.getGpHotelData();
    }
    else if(activeDiv=='second'){
      this.first=false;
      this.second=true;
      this.third=false;
      this.getGpFlightData();
    }
    else{
        this.first=false;
        this.second=false;
        this.third=true;
        this.getGpDeliveryData()
      
    }
  }

}
