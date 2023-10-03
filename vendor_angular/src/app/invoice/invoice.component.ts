import { Component, OnInit } from '@angular/core';
import { InvoiceService } from './invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  constructor(private _httpservice: InvoiceService) { }

  INVOICE: any;
  searchtext: any;

  headers = ["COMPANY CODE", "DOCUMENT NO", "YEAR", "LINE ITEM", "LINE ITEM ID", "POSTING KEY", "ACCOUNT TYPE",
              "AMOUNT IN LOCAL CURRENCY", "AMOUNT", "GENERAL LEDGER AMOUNT", "GENERAL LEDGER CURRENCY", "TRANSACTION", "ASSIGNMENT",
              "TRANSACTION TYPE", "G/L ACCOUNT", "PLANT", "QUANTITY", "BASE UNIT OF MEASURE", "PURCHASING DOCUMENT", "ITEM"];
  
  names = ["BUKRS", "BELNR", "GJAHR", "BUZEI", "BUZID", "BSCHL", "KOART", "DMBTR", "WRBTR", "PSWBT", "PSWSL", "KTOSL", "ZUONR",
            "VORGN", "HKONT", "WERKS", "MENGE", "MEINS", "EBELN", "EBELP"];


  ngOnInit() {
    this._httpservice.invoice().subscribe(
      data =>{
        this.INVOICE = data;
        console.log(data);
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
