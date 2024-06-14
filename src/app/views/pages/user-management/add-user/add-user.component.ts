import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @Input() platformUser: any ;
  constructor() { }

  ngOnInit(): void {
  }

}
