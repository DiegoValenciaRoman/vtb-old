import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { ProductosComponent } from "./pages/productos/productos.component";
import { ProductoComponent } from './pages/producto/producto.component';
import { LoginComponent } from "./pages/usuarios/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { UsuariosComponent } from "./pages/usuarios/usuarios/usuarios.component";
import { UsuarioComponent } from "./pages/usuarios/usuario/usuario.component";
import { ClientesComponent } from './pages/clientes/clientes/clientes.component';
import { ClienteComponent } from "./pages/clientes/cliente/cliente.component";

// GUARD
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canLoad:[AuthGuard]},
  { path: 'usuarios', component: UsuariosComponent, canActivate:[AuthGuard] },
  { path: 'usuario/:_id', component: UsuarioComponent, canActivate: [AuthGuard] },
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard] },
  { path: 'cliente/:accion', component: ClienteComponent, canActivate: [AuthGuard] },
  { path: 'cliente/:accion/:_id', component: ClienteComponent, canActivate: [AuthGuard] },
  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard] },
  { path: 'producto/:_id', component: ProductoComponent, canActivate: [AuthGuard] },

  { path: '**', pathMatch: 'full', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
