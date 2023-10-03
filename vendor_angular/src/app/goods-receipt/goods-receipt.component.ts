import { Component, OnInit } from '@angular/core';
import { GoodsReceiptService } from './goods-receipt.service';

@Component({
  selector: 'app-goods-receipt',
  templateUrl: './goods-receipt.component.html',
  styleUrls: ['./goods-receipt.component.scss']
})
export class GoodsReceiptComponent implements OnInit {

  constructor(private _httpservice: GoodsReceiptService) { }

  GOODS_HEAD: any;
  GOODS_ITEMS: any;

  searchtext1: any;
  searchtext2: any;

  GOODS_HEAD_headers = ["MATERIAL DOCUMENT", "DOCUMENT YEAR", "TRANSACTION TYPE", "DOCUMENT DATE", "POSTING DATE",
                        "ENTRY DATE", "ENTRY TIME", "USERNAME", "VERSION FOR PRINTING GR SLIP"];

  GOODS_ITEMS_headers = ["MATERIAL DOCUMENT", "DOCUMENT YEAR", "ITEM IN MATERIAL DOCUMENT", "MATERIAL NO", "PLANT",
                      "STORAGE LOCATION", "MOVEMENT TYPE", "ENTRY QUANTITY", "UNIT OF ENTRY",
                      "UNIT ISO CODE", "QUANTITY IN PO PRICE UNIT", "ORDER PRICE UNIT", "UNIT ISO CODE",
                      "PURCHASE ORDER NO", "ITEM NO", "CURRENCY KEY", "ISO CURRENCY CODE"];

  GOODS_HEAD_names = ["MAT_DOC", "DOC_YEAR", "TR_EV_TYPE", "DOC_DATE", "PSTNG_DATE", "ENTRY_DATE", "ENTRY_TIME", "USERNAME",
                      "VER_GR_GI_SLIP"];

  GOODS_ITEMS_names = ["MAT_DOC", "DOC_YEAR", "MATDOC_ITM", "MATERIAL", "PLANT", "STGE_LOC", "MOVE_TYPE", "ENTRY_QNT", "ENTRY_UOM",
                    "ENTRY_UOM_ISO", "PO_PR_QNT", "ORDERPR_UN", "ORDERPR_UN_ISO", "PO_NUMBER", "PO_ITEM", "CURRENCY", "CURRENCY_ISO"];


  ngOnInit() {
    this._httpservice.gr().subscribe(
      data =>{
        this.GOODS_HEAD = data[0];
        this.GOODS_ITEMS = data[1];
        // console.log(this.GOODS_HEAD);
        // console.log(this.GOODS_ITEMS);
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
