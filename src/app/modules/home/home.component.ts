import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title: string;
  description: string;

  constructor() {
    this.title = 'Welcome to the Home Page';
    this.description = 'This is the home page of our Application.';
  }

  ngOnInit(): void {
  }

}
