import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { Router, ActivatedRoute } from  '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  activeLink=false
  constructor(private router:Router) { }
  
  public logout(){
    localStorage.removeItem("currentUser")
    this.router.navigateByUrl(`/login`)
    //environment.token=null;
  }
  ngOnInit() {
  }
  toggleNavbar() {
    var width = $('.sidebar').width();
    if(width == 0) {
      $('.sidebar').animate({width:"250"});
      $('.toggle-nav-icon').animate({marginLeft:"270"});
      $('.content-overlay').animate({opacity:"1"});
      $('.content-overlay').animate({zIndex:"5"});


   } else {
      $('.sidebar').animate({width:"0"});
      $('.toggle-nav-icon').animate({marginLeft:"20"});
      $('.content-overlay').animate({opacity:"0"});
      $('.content-overlay').animate({zIndex:"-3"});

   }
  }

}
