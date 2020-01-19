import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-applayout',
  templateUrl: './applayout.component.html',
  styleUrls: ['./applayout.component.css']
})
export class ApplayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  hideOverlay(){
    $('.sidebar').animate({width:"0"});
       $('.toggle-nav-icon').animate({marginLeft:"20"});
       $('.content-overlay').animate({opacity:"0"});
       $('.content-overlay').animate({zIndex:"-3"});
       $('.confirm-msg').css({opacity:"0"});

  }
  toggleNavbar() {
    var width = $('.sidebar').width();
    if(width == 0) {
       $('.sidebar').animate({width:"250"});
       $('.toggle-nav-icon').animate({marginLeft:"270"},1000);
       $('.content-overlay').css({opacity:"1",transition:'all 1s'});
       $('.content-overlay').css({zIndex:"5",transition:'all 1s'});

       
      
    } else {
       $('.sidebar').animate({width:"0"});
       $('.toggle-nav-icon').animate({marginLeft:"20"});
       $('.content-overlay').animate({opacity:"0"});
       $('.content-overlay').animate({zIndex:"-3"});


    }
  }
}
