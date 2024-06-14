import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
title: any;
description: any;

  
    
  
    constructor() {
      this.title = 'About Us';
      this.description = 'We are a company committed to delivering the best services to our customers. Our mission is to innovate and lead in our industry.';
    }
   

  ngOnInit(): void {
  }

}
