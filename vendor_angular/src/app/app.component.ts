import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vendor_portal';
  constructor(private route:Router){
    this.route.navigate(['/login']) // navigate to other page
  } 
		
}
