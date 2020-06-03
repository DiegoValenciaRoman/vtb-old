import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { UsuarioComponent } from './pages/usuarios/usuario/usuario.component';
import { UsuariosComponent } from './pages/usuarios/usuarios/usuarios.component';
import { LoginComponent } from './pages/usuarios/login/login.component';
import { ClientesComponent } from './pages/clientes/clientes/clientes.component';
import { ClienteComponent } from './pages/clientes/cliente/cliente.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    ProductoComponent,
    SidebarComponent,
    UsuarioComponent,
    UsuariosComponent,
    LoginComponent,
    ClientesComponent,
    ClienteComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
