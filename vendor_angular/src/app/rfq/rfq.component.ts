import { Component, OnInit } from '@angular/core';
import { RfqService } from './rfq.service'; 

@Component({
  selector: 'app-rfq',
  templateUrl: './rfq.component.html',
  styleUrls: ['./rfq.component.scss']
})
export class RfqComponent implements OnInit {

  constructor(private _httpservice: RfqService) { }

  RFQ: any;
  searchtext: any;

  headers = ["VENDOR", "VENDOR NAME", "PURCHASE DOCUMENT", "COMPANY CODE", "DOCUMENT TYPE", "STATUS", "CREATED ON", "ITEM NUMBER INTERVAL",
              "LAST ITEM", "PURCHASE ORGANIZATION", "PURCHASE GROUP", "CURRENCY", "EXCHANGE RATE", "DOCUMENT DATE",
              "COUNTRY FOR TAX RETURN", "CUSTOMER", "CURRENCY ISO"];

  names = ["VENDOR", "VEND_NAME", "PO_NUMBER", "CO_CODE", "DOC_TYPE", "STATUS", "CREATED_ON", "ITEM_INTVL", "LAST_ITEM", "PURCH_ORG", "PUR_GROUP", "CURRENCY", "EXCH_RATE", "DOC_DATE",
            "TAXR_CNTRY", "CUSTOMER", "CURRENCY_ISO"];

  ngOnInit() {
    this._httpservice.rfq().subscribe(
      data =>{
        this.RFQ = data;
        // console.log(this.RFQ);        
      }, err => {
        console.log(err);
      }
    )
  }

  /////////////////////   Sorting   ///////////////////////
  key: String = "id";
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

}
