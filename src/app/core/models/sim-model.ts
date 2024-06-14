export class Sim {
    id: number;
    PO: string;
    quantity: number;
    imsiStart: string;
    imsiEnd: string;
    iccidStart: string;
    iccidEnd: string;
    ExpirationDate: Date;
    iccid: string;
    imsi: string;
    pin1: string;
    pin2: string;
    puk1: string;
    puk2: string;
    status: string;
  }
  
  export class SimStatus{
    locationName : string;
    Available : number;
    Fulfilled : number;
    Activated : number;
    Cancel : number;
  }