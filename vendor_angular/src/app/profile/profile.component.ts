import { Component, OnInit } from '@angular/core';
import { elementAt } from 'rxjs';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private _httpservice: ProfileService) { }

  vendor: string="";
  name: string="";
  company: string="";
  address: string="";
  city: string="";
  district: string="";
  pincode: string="";
  country: string="";
  telephone: string="";


  ngOnInit() {
    this._httpservice.profile().subscribe(
      data =>{
        this.vendor = data[0].VENDOR;
        this.name = data[0].FNAME;
        this.company = data[0].LNAME;
        this.address = data[0].ADDRESS;
        this.city = data[0].CITY;
        this.pincode = data[0].PINCODE;
        this.country = data[0].COUNTRY;
        this.telephone = data[0].TELEPHONE;
        console.log(data);
      }, err => {
        console.log(err);
      }
    )

    
    
  }
}
