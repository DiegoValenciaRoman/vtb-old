import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// MODELS
import { ClienteModel } from "../../../models/cliente.model";
// SERVICES
import { ClientesService } from '../../../services/clientes.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  form: FormGroup;
  resumenes: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private _clientesService: ClientesService) {
    
    this.form = new FormGroup({
      '_id': new FormControl(''),
      'rut': new FormControl('',
        [  Validators.required
        ]),
      'nombre': new FormControl('',
        [  Validators.required, Validators.minLength(2)
        ]),
      'apellido': new FormControl('',
        [  Validators.required, Validators.minLength(2)
        ]),
      'direccion': new FormControl('',
        [ 
        ]),
      'nroContacto': new FormControl('',
        [  Validators.minLength(6)
        ]),
      'correo': new FormControl('',
        [  
        ]),
    })
        
  }
                
 

  ngOnInit(): void {

    const accion = this.route.snapshot.paramMap.get('accion');
    const _id = this.route.snapshot.paramMap.get('_id');

    if (accion !== 'registrar') {
      this._clientesService.getCliente(_id)
        .subscribe((cliente: ClienteModel) => {
          console.log("PRUEBA REEMPLAZO");
          console.log(cliente);
          this.form.controls['_id'].setValue(_id);
          this.form.controls['nombre'].setValue(cliente.nombre);
          this.form.controls['apellido'].setValue(cliente.apellido);
          this.form.controls['rut'].setValue(cliente.rut);
          this.form.controls['direccion'].setValue(cliente.direccion);
          this.form.controls['nroContacto'].setValue(cliente.nroContacto);
          this.form.controls['correo'].setValue(cliente.correo);

          if (accion == 'ver') {
            this.resumenes = true;
            this.form.disable();
          }
        });
    } 

  }


  guardar() {

    if (this.form.controls['_id'].value) {
      console.log("ACTUALIZAR");
      this._clientesService.actualizarCliente(this.form.value)
        .subscribe(() => {
          this.router.navigate(['/clientes'])
        })
    } else {
      console.log("CREAR");
      this._clientesService.crearCliente(this.form.value)
        .subscribe(() => {
          this.router.navigate(['/clientes'])
        })
    }      
  }

}
