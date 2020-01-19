import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from  '@angular/router';
import { BagsService } from '../bags.service';

@Component({
  selector: 'app-bags-data',
  templateUrl: './bags-data.component.html',
  styleUrls: ['./bags-data.component.css']
})
export class BagsDataComponent implements OnInit {

  constructor(private activeRoute:ActivatedRoute,private router: Router,private _BagsService:BagsService) { }
  bagId:any;
  bag:any;
  ngOnInit() {
    if(!localStorage.getItem('currentUser')) {
      this.router.navigate(['login']);
      return;
    }

    this.activeRoute.paramMap.subscribe(params => {
      this.bagId = params.get("id")
    })

    if(this.bagId){
      this._BagsService.getBagById(this.bagId).subscribe(response=>{
        this.bag=response.Data;
        console.log(this.bag)
        // this.addForm.controls['name'].setValue(this.vendor.Name);
        // this.addForm.controls['email'].setValue(this.vendor.Email);
        // this.addForm.controls['address'].setValue(this.vendor.Address);

      })


    }

  }

}
