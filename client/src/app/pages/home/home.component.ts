import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onNavigate(page: string) {
    let url;
    switch (page) {
      case 'facebook':
        url = 'https://www.facebook.com/VTB-Bike-Center-1294313493958910/';
        break;
      case 'instagram':
        url = 'https://www.instagram.com/vtb_bike_center/';
        break;
    }
    window.open(url, "_blank");
  }

}
