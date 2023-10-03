import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { CredDebComponent } from './cred-deb/cred-deb.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GoodsReceiptComponent } from './goods-receipt/goods-receipt.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PayageComponent } from './payage/payage.component';
import { ProfileComponent } from './profile/profile.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { RfqComponent } from './rfq/rfq.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'login', pathMatch: 'full'
  },
  {
    path:'login',
    component:LoginPageComponent,
  },
  {
    path:'dashboard',
    component:DashboardComponent,
  },
  {
    path:'about',
    component:AboutComponent,
    data:{
      page: 'about'
    }
  },
  {
    path:'contact',
    component:ContactComponent,
    data:{
      page: 'contact'
    }
  },
  {
    path:'profile',
    component:ProfileComponent,
  },
  {
    path:'cred-deb',
    component:CredDebComponent,
  },
  {
    path:'invoice',
    component:InvoiceComponent,
  },
  {
    path:'purchase-order',
    component:PurchaseOrderComponent,
  },
  {
    path:'rfq',
    component:RfqComponent,
  },
  {
    path:'purchase-order',
    component:PurchaseOrderComponent,
  },
  {
    path:'goods-receipt',
    component:GoodsReceiptComponent,
  },
  {
    path:'payage',
    component:PayageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
