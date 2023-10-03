import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GoodsReceiptService {

  constructor(private _http: HttpClient) { }

  private url = 'http://localhost:3000/goods-receipt';

  public gr(){
    return this._http.post<any>(this.url, {
    })
  }
}
