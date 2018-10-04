import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})

export class SinglteonService {

  public id : number;

  constructor() { }

  public setVal(val) {
    this.id = val;
  }

  public getVal() {
    return this.id;
  }

}
