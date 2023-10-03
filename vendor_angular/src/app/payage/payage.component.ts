import { Component, OnInit } from '@angular/core';
import { PayageService } from './payage.service';

@Component({
  selector: 'app-payage',
  templateUrl: './payage.component.html',
  styleUrls: ['./payage.component.scss']
})
export class PayageComponent implements OnInit {

  constructor(private _httpservice: PayageService) { }

                                                                  // COMPANY_CODE: string=""; //BUKRS
                                                                  // ASSIGNMENT_NUMBER: string=""; //ZUONR
                                                                  // DOCUMENT_NUMBER: string=""; //BELNR
                                                                  // POSTING_DATE: string=""; //BUDAT
                                                                  // DOCUMENT_DATE: string=""; //BLDAT
                                                                  // ENTRY_DATE: string=""; //CPUDT
                                                                  // CURRENCY_KEY: string=""; //WAERS
                                                                  // POSTING_KEY: string=""; //BSCHL
                                                                  // DEBIT_OR_CREDIT: string=""; //SHKZG
                                                                  // AMOUNT_IN_LOCAL_CURRENCY: string=""; //DMBTR
                                                                  // AMOUNT_IN_DOC_CURRENCY: string=""; //WRBTR
                                                                  // AMOUNT_TO_BE_UPDATED: string=""; //PSWBT
                                                                  // UPDATE_CURRENCY: string=""; //PSWSL
                                                                  // SERVICE_CREDIT_IN_DAYS: string=""; //AGING

  PAYAGE: any;
  searchtext: any;

  headers = ["COMPANY CODE", "ASSIGNMENT NUMBER", "DOCUMENT NUMBER", "POSTING KEY",
              "DEBIT/CREDIT", "AMOUNT IN LOCAL CURRENCY", "AMOUNT IN DOCUMENT CURRENCY", "AMOUNT TO BE UPDATED", "UPDATE CURRENCY", "SERVICE CREDIT IN DAYS"];

  names = ["BUKRS", "ZUONR", "BELNR", "BSCHL", "SHKZG", "DMBTR", "WRBTR", "PSWBT", "PSWSL", "AGING"];


  ngOnInit() {
    this._httpservice.payage().subscribe(
      data =>{
        this.PAYAGE = data;
        console.log(this.PAYAGE);
                                                                  // this.COMPANY_CODE = data[0].BUKRS;
                                                                  // this.ASSIGNMENT_NUMBER = data[0].ZUONR;
                                                                  // this.DOCUMENT_NUMBER = data[0].BELNR;
                                                                  // this.POSTING_DATE = data[0].BUDAT;
                                                                  // this.DOCUMENT_DATE = data[0].BLDAT;
                                                                  // this.ENTRY_DATE = data[0].CPUDT;
                                                                  // this.CURRENCY_KEY = data[0].WAERS;
                                                                  // this.POSTING_KEY = data[0].BSCHL;
                                                                  // this.DEBIT_OR_CREDIT = data[0].SHKZG;
                                                                  // this.AMOUNT_IN_LOCAL_CURRENCY = data[0].DMBTR;
                                                                  // this.AMOUNT_IN_DOC_CURRENCY = data[0].WRBTR;
                                                                  // this.AMOUNT_TO_BE_UPDATED = data[0].PSWBT;
                                                                  // this.UPDATE_CURRENCY = data[0].PSWSL;
                                                                  // this.SERVICE_CREDIT_IN_DAYS = data[0].AGING;
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
