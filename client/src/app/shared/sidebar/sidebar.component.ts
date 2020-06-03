import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() loggedOut = new EventEmitter();

  constructor(public _authService: AuthService, router: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    this._authService.logout();
    this.loggedOut.emit()
  }

}
