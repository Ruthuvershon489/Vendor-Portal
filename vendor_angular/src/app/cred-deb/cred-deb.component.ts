import { Component, OnInit } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { CredDebService } from './cred-deb.service';

@Component({
  selector: 'app-cred-deb',
  templateUrl: './cred-deb.component.html',
  styleUrls: ['./cred-deb.component.scss']
})
export class CredDebComponent implements OnInit {

  constructor(private _httpservice: CredDebService) { }

  CREDIT: any;
  DEBIT: any;

  searchtext1: any;
  searchtext2: any;

  CREDIT_headers = ["VENDOR", "MATERIAL", "PLANT", "QUANTIY", "BASE UNIT",
                    "COMPANY CODE", "DOCUMENT NO", "FINANCIAL YEAR", "LINE ITEM",
                    "CLEARING DATE", "ACCOUNT TYPE", "AMOUNT IN LOCAL CURRENCY", "VALUATION DIFFERENCE",
                    "BALANCE SHEET ACCOUNT"];

  DEBIT_headers = ["VENDOR", "MATERIAL", "PLANT", "QUANTIY", "BASE UNIT",
                    "COMPANY CODE", "DOCUMENT NO", "FINANCIAL YEAR", "LINE ITEM",
                    "CLEARING DATE", "ACCOUNT TYPE", "AMOUNT IN LOCAL CURRENCY", "VALUATION DIFFERENCE",
                    "BALANCE SHEET ACCOUNT"];

  CREDIT_names = ["LIFNR", "MATNR", "WERKS", "MENGE", "MEINS", "BUKRS", "BELNR", "GJAHR", "BUZEI",
                  "AUGDT", "KOART", "DMBTR", "BDIFF", "XBILK"];

  DEBIT_names = ["LIFNR", "MATNR", "WERKS", "MENGE", "MEINS", "BUKRS", "BELNR", "GJAHR", "BUZEI",
                  "AUGDT", "KOART", "DMBTR", "BDIFF", "XBILK"];


  ngOnInit() {
    this._httpservice.cred_deb().subscribe(
      data =>{
        this.CREDIT = data[0];
        this.DEBIT = data[1];
        // console.log(this.CREDIT);
        // console.log(this.DEBIT);
      }, err => {
        console.log(err);
      }
    )
  }

  /////////////////////   Sorting   ///////////////////////
  key1: String = "id1";
  reverse1: boolean = false;
  sort1(key) {
    this.key1 = key;
    this.reverse1 = !this.reverse1;
  }

  key2: String = "id2";
  reverse2: boolean = false;
  sort2(key) {
    this.key2 = key;
    this.reverse2 = !this.reverse2;
  }
  
}
