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

  access_role = {
    admin_role: ['venta', 'servicioMecánico', 'almacenamiento', 'clientes', 'usuarios'],
    vendedor_role: ['venta', 'clientes'],
    mecanico_role: ['servicioMecanico']
  }
  access = [];

  constructor(public _authService: AuthService, router: Router) { }

  ngOnInit(): void {
    let role = this._authService.getUserDetails().role;
    switch (role) {
      case 'ADMIN_ROLE': this.access = this.access_role.admin_role;      
        break;
      case 'VENDEDOR_ROLE': this.access = this.access_role.vendedor_role;      
        break;
      case 'MECANICO_ROLE': this.access = this.access_role.mecanico_role;      
        break;
    }
  }

  logOut() {
    this._authService.logout();
    this.loggedOut.emit()
  }

  displayNavSection(idTag: string) {
    if (this.access.includes(idTag)) {
      return true
    }
    return false;
  }

}
