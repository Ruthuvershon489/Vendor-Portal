import { Component, OnInit } from '@angular/core';
import { PurchaseOrderService } from './purchase-order.service';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.scss']
})
export class PurchaseOrderComponent implements OnInit {

  constructor(private _httpservice: PurchaseOrderService) { }

    PO_HEAD: any;
    PO_VAL: any;

    searchtext1: any;
    searchtext2: any;

    PO_HEAD_headers = ["VENDOR ID", "PURCHASE DOCUMENT", "DOCUMENT CATEGORY", "DOCUMENT TYPE", "STATUS",
                        "CREATED ON", "ITEM INTERVAL", "DISCOUNT DAY1", "DISCOUNT DAY2",
                        "DISCOUNT DAY3", "CASH DISCOUNT1", "CASH DISCOUNT2", "CURRENCY",
                        "TAX RETURN COUNTRY", "ISO CURRENCY CODE", "EXCHANGE RATE"];

    PO_VAL_headers = ["PURCHASE DOCUMENT", "PURCHASE ITEM", "SHORT TEXT", "MATERIAL", "PLANT",
                      "STORE LOCATION", "QUANTITY", "UNIT", "NET PRICE",
                      "PRICE UNIT", "NET VALUE", "GROSS VALUE", "PRICE DATE",
                      "EFFECTIVE VALUE", "WEIGHTUNIT ISO"];

    PO_HEAD_names = ["VENDOR", "PO_NUMBER", "DOC_CAT", "DOC_TYPE", "STATUS", "CREATED_ON", "ITEM_INTVL", "DSCNT1_TO", "DSCNT2_TO",
                      "DSCNT3_TO", "CASH_DISC1", "CASH_DISC2", "CURRENCY", "TAXR_CNTRY", "CURRENCY_ISO", "EXCH_RATE_CM"];

    PO_VAL_names = ["PO_NUMBER", "PO_ITEM", "SHORT_TEXT", "MATERIAL", "PLANT", "STORE_LOC", "QUANTITY", "UNIT", "NET_PRICE",
                    "PRICE_UNIT", "NET_VALUE", "GROS_VALUE", "PRICE_DATE", "EFF_VALUE", "WEIGHTUNIT_ISO"];


  ngOnInit() {
    this._httpservice.po().subscribe(
      data =>{
        this.PO_HEAD = data[0];
        this.PO_VAL = data[1];
        // console.log(data);
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
