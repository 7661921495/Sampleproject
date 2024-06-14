import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceDataService {

  constructor() { }
  getServices() {
    return [
      { id: 1, name: 'Web Development', description: 'Building responsive and scalable web applications.' },
      { id: 2, name: 'Mobile Development', description: 'Creating mobile applications for Android and iOS platforms.' },
      { id: 3, name: 'UI/UX Design', description: 'Designing user-friendly and aesthetic interfaces.' }
    ];
  }
}
