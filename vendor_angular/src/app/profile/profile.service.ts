import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _http: HttpClient) { }

  private url = 'http://localhost:3000/profile';
  
  public profile(){
    return this._http.post<any>(this.url, {
    })
  }
}
