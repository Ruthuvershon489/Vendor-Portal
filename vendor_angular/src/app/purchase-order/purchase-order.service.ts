import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  constructor(private _http: HttpClient) { }

  private url = 'http://localhost:3000/purchase-order';
  
  public po(){
    return this._http.post<any>(this.url, {
    })
  }
}
