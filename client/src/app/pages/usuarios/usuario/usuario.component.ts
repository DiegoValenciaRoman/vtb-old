import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

// MODELS
import { UsuarioModel } from '../../../models/usuario.model';

// SERVICES
import { UsuariosService } from "../../../services/usuarios.service";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  // usuario: UsuarioModel = {
  //   _id: '',
  //   name: '',
  //   password: '',
  //   rut: '',
  //   role: '',
  //   status: null
  // };

  form: FormGroup;


  constructor(  private route: ActivatedRoute,
                private router: Router,
                private _usuariosService: UsuariosService) {

    this.form = new FormGroup({
      '_id': new FormControl(''),
      'rut': new FormControl('',
        [
          Validators.required
          //Validators.pattern("^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$")
        ]),
      'name': new FormControl('',
        [
          Validators.required, Validators.minLength(2)
        ]),
      'password': new FormControl('',
        [
          Validators.required
        ]),
      'role': new FormControl('',
        [
          Validators.required
        ])
    })

  }

  ngOnInit(): void {

    const _id = this.route.snapshot.paramMap.get('_id');

    if (_id !== 'nuevo') {
      // Actualizar usuario
      //this.usuario._id = _id;
      this._usuariosService.getUsuario(_id)
        .subscribe((usuario: UsuarioModel) => {
          console.log("PRUEBA REEMPLAZO");
          console.log(usuario);
          this.form.controls['_id'].setValue(_id);
          this.form.controls['rut'].setValue(usuario.rut);
          this.form.controls['name'].setValue(usuario.name);
          this.form.controls['role'].setValue(usuario.role);
        });
    }

  }

  guardar() {
    //console.log(this._idUsuario);
 
    if (this.form.controls['_id'].value) {
      console.log("ACTUALIZAR");
      this._usuariosService.actualizarUsuario(this.form.value)
        .subscribe(() => {
          this.router.navigate(['/usuarios'])
        })
    } else {
      console.log("CREAR");
      this._usuariosService.crearUsuario(this.form.value)
        .subscribe(() => {
          this.router.navigate(['/usuarios'])
        })
    }

  }

}
