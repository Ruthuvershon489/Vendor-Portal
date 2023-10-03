// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const app = require("express")();
// const fetch = require('node-fetch');
// const base64 = require('base-64');
// const xml2js = require('xml2js');

import express from 'express';
const app = express();
import fetch from 'node-fetch';
import base64 from 'base-64';
import xml2js from 'xml2js';
import body_parser from 'body-parser';
import cors from 'cors';
import date from 'date-and-time';

app.use(body_parser.urlencoded({extended: true}));

app.use(body_parser.json());

//  // For pipo cred
const pipo_username = "pouser@2"
const pipo_password = "2022@Tech"

app.use(cors({
    origin: ["http://localhost:4200"]
}));

const PORT = process.env.PORT || 3000;

var server_username;

app.post('/login', async (req, res) => {
    console.log(req.body);
    server_username = req.body.uname;
    var req_url = "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_RUTHU_VP_LOGIN&receiverParty=&receiverService=&interface=SI_RUTHU_VP_LOGIN&interfaceNamespace=http://ruthu_vp.com";
    var req_xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                        <soapenv:Header/>
                        <soapenv:Body>
                        <urn:ZRUTHU_VP_LOGIN_FM>
                            <!--You may enter the following 2 items in any order-->
                            <PASSWORD>${req.body.password}</PASSWORD>
                            <VENDOR_ID>${server_username}</VENDOR_ID>
                        </urn:ZRUTHU_VP_LOGIN_FM>
                        </soapenv:Body>
                    </soapenv:Envelope>`

    const login_res = await fetch(req_url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers:{
            'Content-Type': 'text/xml',
            'Authorization': 'Basic ' + base64.encode(pipo_username + ':' + pipo_password)
            },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: req_xml
    }).then(res => res.text())

    xml2js.parseString(login_res, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(data);
            var verify_data = data['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZRUTHU_VP_LOGIN_FM.Response'][0]['MESSAGE']
            var name_data = data['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZRUTHU_VP_LOGIN_FM.Response'][0]['NAME']
            var out_data =[verify_data, name_data]
            console.log(out_data);
            res.send(out_data);
        }
    });
});


app.post('/profile', async (req, res) => {
    // console.log(req.body); 
    var req_url = "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_RUTHU_VP_DASH&receiverParty=&receiverService=&interface=SI_RUTHU_VP_DASH&interfaceNamespace=http://ruthu_vp.com";
    var req_xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                        <soapenv:Header/>
                        <soapenv:Body>
                        <urn:ZRUTHU_VP_DASH_FM>
                            <VENDOR_ID>${server_username}</VENDOR_ID>
                        </urn:ZRUTHU_VP_DASH_FM>
                        </soapenv:Body>
                    </soapenv:Envelope>`

    const profile_res = await fetch(req_url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers:{
            'Content-Type': 'text/xml',
            'Authorization': 'Basic ' + base64.encode(pipo_username + ':' + pipo_password)
            },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: req_xml
    }).then(res => res.text())

    xml2js.parseString(profile_res, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            var out_data = data['SOAP:Envelope']['SOAP:Body'][0]['rfc:ZRUTHU_VP_DASH_FM.Response'][0]['VENDOR_DASHBOARD']
            
            if(out_data == null){
                console.log("emptyyyyyyyyyy")
            }
            else {
                out_data.forEach(function (table) {

                    /////////////   Preceeding 0's    ////////////////
                    Object.entries(table).forEach(([key, value]) => {
                            table[key] = String(table[key]).replace(/^0+/, "");
                      });

                    /////////////   Empty replace    /////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if(value == "" || value == null){
                            table[key] = "TBA";
                        }
                      });
                });
            }
            
            console.log(out_data);
            res.send(out_data);
        }
    });
});


app.post('/invoice', async (req, res) => {
    // console.log(req.body); 
    var req_url = "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_RUTHU_VP_INVOICE&receiverParty=&receiverService=&interface=SI_RUTHU_VP_INVOICE&interfaceNamespace=http://ruthu_vp.com";
    var req_xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                        <soapenv:Header/>
                        <soapenv:Body>
                        <urn:ZRUTHU_VP_INVOICE_FM>
                            <VENDOR_ID>${server_username}</VENDOR_ID>
                            <INVOICE_TAB>
                            </INVOICE_TAB>
                        </urn:ZRUTHU_VP_INVOICE_FM>
                        </soapenv:Body>
                    </soapenv:Envelope>`

    const invoice_res = await fetch(req_url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers:{
            'Content-Type': 'text/xml',
            'Authorization': 'Basic ' + base64.encode(pipo_username + ':' + pipo_password)
            },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: req_xml
    }).then(res => res.text())

    xml2js.parseString(invoice_res, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            var out_data = data['SOAP:Envelope']['SOAP:Body'][0]['rfc:ZRUTHU_VP_INVOICE_FM.Response'][0]['INVOICE_DETAILS'][0]['item']
            
            if(out_data == null){
                console.log("emptyyyyyyyyyy")
            }
            else {
                out_data.forEach(function (table) {

                    /////////////   Preceeding 0's    ////////////////
                    Object.entries(table).forEach(([key, value]) => {
                            table[key] = String(table[key]).replace(/^0+/, "");
                      });

                    /////////////   Empty replace    /////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if(value == "" || value == null){
                            table[key] = "TBA";
                        }
                      });
                });

                /////////////////   DATE    /////////////////////
                // out_data.forEach(function (table) {
                //     Object.entries(table).forEach(([key, value]) => {
                //         if(key == 'ERDAT' || key == 'ANGDT' || key == 'BNDDT'
                //            || key == 'AUDAT' || key == 'VDATU') {
                //             if(table[key] == "-00-00" || table[key] == "") {
                //                 table[key] = "TBA"
                //             }
                //             else {
                //                 const now = new Date(table[key]);
                //                 table[key] = date.format(now, 'DD-MM-YYYY');
                //             }
                //         }
                //       })
                //     });
            }
            // console.log(out_data);
            res.send(out_data);
        }
    });
});

app.post('/purchase-order', async (req, res) => {
    // console.log(req.body); 
    var req_url = "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_RUTHU_VP_PO&receiverParty=&receiverService=&interface=SI_RUTHU_VP_PO&interfaceNamespace=http://ruthu_vp.com";
    var req_xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                        <soapenv:Header/>
                        <soapenv:Body>
                        <urn:ZRUTHU_VP_PO_FM>
                            <VENDOR_ID>${server_username}</VENDOR_ID>
                            <PO_TAB>
                            </PO_TAB>
                        </urn:ZRUTHU_VP_PO_FM>
                        </soapenv:Body>
                    </soapenv:Envelope>`

    const po_res = await fetch(req_url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers:{
            'Content-Type': 'text/xml',
            'Authorization': 'Basic ' + base64.encode(pipo_username + ':' + pipo_password)
            },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: req_xml
    }).then(res => res.text())

    xml2js.parseString(po_res, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            var pohead_data = data['SOAP:Envelope']['SOAP:Body'][0]['rfc:ZRUTHU_VP_PO_FM.Response'][0]['PO_HEAD'][0]['item']
            var povalues_data = data['SOAP:Envelope']['SOAP:Body'][0]['rfc:ZRUTHU_VP_PO_FM.Response'][0]['PO_VALUES'][0]['item']
            
            /////////////////////////////  pohead   ///////////////////////////////
            if(pohead_data == null){
                console.log("emptyyyyyyyyyy")
            }
            else {
                pohead_data.forEach(function (table) {

                    /////////////   Preceeding 0's    ////////////////
                    Object.entries(table).forEach(([key, value]) => {
                            table[key] = String(table[key]).replace(/^0+/, "");
                      });

                    /////////////   Empty replace    /////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if(value == "" || value == null){
                            table[key] = "TBA";
                        }
                      });
                });

                /////////////////   DATE    /////////////////////
                pohead_data.forEach(function (table) {
                    Object.entries(table).forEach(([key, value]) => {
                        if(key == 'CREATED_ON') {
                            if(table[key] == "-00-00" || table[key] == "") {
                                table[key] = "TBA"
                            }
                            else {
                                const now = new Date(table[key]);
                                table[key] = date.format(now, 'DD-MM-YYYY');
                            }
                        }
                      })
                    });
            }

            /////////////////////////////  povalues   ///////////////////////////////
            if(povalues_data == null){
                console.log("emptyyyyyyyyyy")
            }
            else {
                povalues_data.forEach(function (table) {

                    /////////////   Preceeding 0's    ////////////////
                    Object.entries(table).forEach(([key, value]) => {
                            table[key] = String(table[key]).replace(/^0+/, "");
                      });

                    /////////////   Empty replace    /////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if(value == "" || value == null){
                            table[key] = "TBA";
                        }
                      });
                });

                /////////////////   DATE    /////////////////////
                povalues_data.forEach(function (table) {
                    Object.entries(table).forEach(([key, value]) => {
                        if(key == 'PRICE_DATE') {
                            if(table[key] == "-00-00" || table[key] == "") {
                                table[key] = "TBA"
                            }
                            else {
                                const now = new Date(table[key]);
                                table[key] = date.format(now, 'DD-MM-YYYY');
                            }
                        }
                      })
                    });
            }
            var out_data = [pohead_data, povalues_data]
            res.send(out_data);
        }
    });
});

app.post('/rfq', async (req, res) => {
    // console.log(req.body); 
    var req_url = "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_RUTHU_VP_RFQ&receiverParty=&receiverService=&interface=SI_RUTHU_VP_RFQ&interfaceNamespace=http://ruthu_vp.com";
    var req_xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                        <soapenv:Header/>
                        <soapenv:Body>
                        <urn:ZRUTHU_VP_RFQ_FM>
                            <VENDOR_ID>${server_username}</VENDOR_ID>
                            <RFQ_TAB>
                            </RFQ_TAB>
                        </urn:ZRUTHU_VP_RFQ_FM>
                        </soapenv:Body>
                    </soapenv:Envelope>`

    const rfq_res = await fetch(req_url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers:{
            'Content-Type': 'text/xml',
            'Authorization': 'Basic ' + base64.encode(pipo_username + ':' + pipo_password)
            },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: req_xml
    }).then(res => res.text())

    xml2js.parseString(rfq_res, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            var out_data = data['SOAP:Envelope']['SOAP:Body'][0]['rfc:ZRUTHU_VP_RFQ_FM.Response'][0]['RFQ_TAB'][0]['item']
            
            if(out_data == null){
                console.log("emptyyyyyyyyyy")
            }
            else {
                out_data.forEach(function (table) {

                    /////////////   Preceeding 0's    ////////////////
                    Object.entries(table).forEach(([key, value]) => {
                            table[key] = String(table[key]).replace(/^0+/, "");
                      });

                    /////////////   Empty replace    /////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if(value == "" || value == null){
                            table[key] = "TBA";
                        }
                      });
                });

                /////////////////   DATE    /////////////////////
                out_data.forEach(function (table) {
                    Object.entries(table).forEach(([key, value]) => {
                        if(key == 'CREATED_ON' || key == 'DOC_DATE') {
                            if(table[key] == "-00-00" || table[key] == "") {
                                table[key] = "TBA"
                            }
                            else {
                                const now = new Date(table[key]);
                                table[key] = date.format(now, 'DD-MM-YYYY');
                            }
                        }
                      })
                    });
            } 
            // console.log(out_data);
            res.send(out_data);
        }
    });
});


app.post('/payage', async (req, res) => {
    // console.log(req.body); 
    var req_url = "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_RUTHU_VP_PAYAGE&receiverParty=&receiverService=&interface=SI_RUTHU_VP_PAY_AGING&interfaceNamespace=http://ruthu_vp.com";
    var req_xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                        <soapenv:Header/>
                        <soapenv:Body>
                        <urn:ZRUTHU_VP_PAY_AGING_FM>
                            <VENDOR_ID>${server_username}</VENDOR_ID>
                            <PAY_TAB>
                            </PAY_TAB>
                        </urn:ZRUTHU_VP_PAY_AGING_FM>
                        </soapenv:Body>
                    </soapenv:Envelope>`

    const payage_res = await fetch(req_url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers:{
            'Content-Type': 'text/xml',
            'Authorization': 'Basic ' + base64.encode(pipo_username + ':' + pipo_password)
            },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: req_xml
    }).then(res => res.text())

    xml2js.parseString(payage_res, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            var out_data = data['SOAP:Envelope']['SOAP:Body'][0]['rfc:ZRUTHU_VP_PAY_AGING_FM.Response'][0]['PAY_AGE_TAB'][0]['item']
            
            if(out_data == null){
                console.log("emptyyyyyyyyyy")
            }
            else {
                out_data.forEach(function (table) {

                    /////////////   Preceeding 0's    ////////////////
                    Object.entries(table).forEach(([key, value]) => {
                            table[key] = String(table[key]).replace(/^0+/, "");
                      });

                    /////////////   Empty replace    /////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if(value == "" || value == null){
                            table[key] = "TBA";
                        }
                      });
                });
            }
            // console.log(out_data);
            res.send(out_data);
        }
    });
});


app.post('/goods-receipt', async (req, res) => {
    // console.log(req.body); 
    var req_url = "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_RUTHU_VP_GR&receiverParty=&receiverService=&interface=SI_RUTHU_VP_GR&interfaceNamespace=http://ruthu_vp.com";
    var req_xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                        <soapenv:Header/>
                        <soapenv:Body>
                        <urn:ZRUTHU_VP_GR_FM>
                            <VENDOR_ID>${server_username}</VENDOR_ID>
                        </urn:ZRUTHU_VP_GR_FM>
                        </soapenv:Body>
                    </soapenv:Envelope>`

    const gr_res = await fetch(req_url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers:{
            'Content-Type': 'text/xml',
            'Authorization': 'Basic ' + base64.encode(pipo_username + ':' + pipo_password)
            },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: req_xml
    }).then(res => res.text())

    xml2js.parseString(gr_res, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            var gh_data = data['SOAP:Envelope']['SOAP:Body'][0]['rfc:ZRUTHU_VP_GR_FM.Response'][0]['GOODS_HEAD'][0]['item'] //goods-head
            var gi_data = data['SOAP:Envelope']['SOAP:Body'][0]['rfc:ZRUTHU_VP_GR_FM.Response'][0]['GOODS_ITEMS'][0]['item'] //goods-items
            
            ////////////////////////////////   gh   //////////////////////////////////
            if(gh_data == null){
                console.log("emptyyyyyyyyyy")
            }
            else {
                gh_data.forEach(function (table) {

                    /////////////   Preceeding 0's    ////////////////
                    Object.entries(table).forEach(([key, value]) => {
                            table[key] = String(table[key]).replace(/^0+/, "");
                      });

                    /////////////   Empty replace    /////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if(value == "" || value == null){
                            table[key] = "TBA";
                        }
                      });
                });

                /////////////////   DATE    /////////////////////
                gh_data.forEach(function (table) {
                    Object.entries(table).forEach(([key, value]) => {
                        if(key == 'DOC_DATE' || key == 'PSTNG_DATE' || key == 'ENTRY_DATE') {
                            if(table[key] == "-00-00" || table[key] == "") {
                                table[key] = "TBA"
                            }
                            else {
                                const now = new Date(table[key]);
                                table[key] = date.format(now, 'DD-MM-YYYY');
                            }
                        }
                      })
                    });
            }

            ////////////////////////////////   gh   //////////////////////////////////
            if(gi_data == null){
                console.log("emptyyyyyyyyyy")
            }
            else {
                gi_data.forEach(function (table) {

                    /////////////   Preceeding 0's    ////////////////
                    Object.entries(table).forEach(([key, value]) => {
                            table[key] = String(table[key]).replace(/^0+/, "");
                      });

                    /////////////   Empty replace    /////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if(value == "" || value == null){
                            table[key] = "TBA";
                        }
                      });
                });

                /////////////////   DATE    /////////////////////
                // gi_data.forEach(function (table) {
                //     Object.entries(table).forEach(([key, value]) => {
                //         if(key == 'ERDAT' || key == 'ANGDT' || key == 'BNDDT'
                //            || key == 'AUDAT' || key == 'VDATU') {
                //             if(table[key] == "-00-00" || table[key] == "") {
                //                 table[key] = "TBA"
                //             }
                //             else {
                //                 const now = new Date(table[key]);
                //                 table[key] = date.format(now, 'DD-MM-YYYY');
                //             }
                //         }
                //       })
                //     });
            }
            var out_data = [gh_data, gi_data]
            // console.log(out_data);
            res.send(out_data);
        }
    });
});


app.post('/cred-deb', async (req, res) => {
    // console.log(req.body); 
    var req_url = "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_RUTHU_VP_CRED_DEB&receiverParty=&receiverService=&interface=SI_RUTHU_VP_CRED_DEB&interfaceNamespace=http://ruthu_vp.com";
    var req_xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
                        <soapenv:Header/>
                        <soapenv:Body>
                        <urn:ZRUTHU_VP_CRED_DEB_FM>
                            <VENDOR_ID>${server_username}</VENDOR_ID>
                            <CRED_TAB>
                            
                            </CRED_TAB>
                            <DEB_TAB>
                                
                            </DEB_TAB>
                        </urn:ZRUTHU_VP_CRED_DEB_FM>
                        </soapenv:Body>
                    </soapenv:Envelope>`

    const cred_deb_res = await fetch(req_url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'include',
        headers:{
            'Content-Type': 'text/xml',
            'Authorization': 'Basic ' + base64.encode(pipo_username + ':' + pipo_password)
            },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: req_xml
    }).then(res => res.text())

    xml2js.parseString(cred_deb_res, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            var cred_data = data['SOAP:Envelope']['SOAP:Body'][0]['rfc:ZRUTHU_VP_CRED_DEB_FM.Response'][0]['CRED_TAB'][0]['item']
            var deb_data = data['SOAP:Envelope']['SOAP:Body'][0]['rfc:ZRUTHU_VP_CRED_DEB_FM.Response'][0]['DEB_TAB'][0]['item']
            
            ///////////////////////////////////   credit   //////////////////////////////
            if(cred_data == null){
                console.log("emptyyyyyyyyyy")
            }
            else {
                cred_data.forEach(function (table) {

                    /////////////   Preceeding 0's    ////////////////
                    Object.entries(table).forEach(([key, value]) => {
                            table[key] = String(table[key]).replace(/^0+/, "");
                      });

                    /////////////   Empty replace    /////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if(value == "" || value == null){
                            table[key] = "TBA";
                        }
                      });
                });

                /////////////////   DATE    /////////////////////
                cred_data.forEach(function (table) {
                    Object.entries(table).forEach(([key, value]) => {
                        if(key == 'AUGDT') {
                            if(table[key] == "-00-00" || table[key] == "") {
                                table[key] = "TBA"
                            }
                            else {
                                const now = new Date(table[key]);
                                table[key] = date.format(now, 'DD-MM-YYYY');
                            }
                        }
                      })
                    });
            }

            ///////////////////////////////////   debit   //////////////////////////////
            if(deb_data == null){
                console.log("emptyyyyyyyyyy")
            }
            else {
                deb_data.forEach(function (table) {

                    /////////////   Preceeding 0's    ////////////////
                    Object.entries(table).forEach(([key, value]) => {
                            table[key] = String(table[key]).replace(/^0+/, "");
                      });

                    /////////////   Empty replace    /////////////////
                    Object.entries(table).forEach(([key, value]) => {
                        if(value == "" || value == null){
                            table[key] = "TBA";
                        }
                      });
                });

                /////////////////   DATE    /////////////////////
                deb_data.forEach(function (table) {
                    Object.entries(table).forEach(([key, value]) => {
                        if(key == 'AUGDT') {
                            if(table[key] == "-00-00" || table[key] == "") {
                                table[key] = "TBA"
                            }
                            else {
                                const now = new Date(table[key]);
                                table[key] = date.format(now, 'DD-MM-YYYY');
                            }
                        }
                      })
                    });
            }
            var out_data = [cred_data, deb_data]
            // console.log(out_data);
            res.send(out_data);
        }
    });
});

app.listen(PORT, () => {
    console.log("server listening on 3000");
  });