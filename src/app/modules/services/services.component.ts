import { Component, OnInit } from '@angular/core';
import { ServiceDataService } from '../service-data.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  
  services: any[] = [];

  constructor(private servicesDataService: ServiceDataService) { }

  ngOnInit(): void {
    this.services = this.servicesDataService.getServices();
  }

  

}
