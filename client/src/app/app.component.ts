import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  logged:boolean;

  constructor( private _authService: AuthService) {

  }

  ngOnInit(): void {

    if (this._authService.isLoggedIn()) {
      this.logged = true;
    } else {
      this.logged = false;
    }

  }

  loggedInOut() {
    this.logged = !this.logged;
  }

}
