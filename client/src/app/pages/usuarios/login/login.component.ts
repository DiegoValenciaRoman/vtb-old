import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

// SERVICES
import { TokenPayload, AuthService } from '../../../services/auth.service';
import { ValidaRutService } from '../../../services/valida-rut.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() loggedIn = new EventEmitter();

  credentials: TokenPayload = {
    rut: '',
    password: ''
  };

  form: FormGroup;
  alertRut: boolean = false;
  alertPassword: boolean = false;
  messageAlertRut: string;
  authError: boolean = false;

  constructor(private _authService: AuthService,
              private _validaRutService: ValidaRutService) {

    this.form = new FormGroup({
    
      'rut': new FormControl('',
          [ Validators.required
          ]),
      'password': new FormControl('',
          [ Validators.required 
        ])
    })
  
  }

  ngOnInit(): void { 
  }

  login() {
    
    this.alertRut = false;
    this.alertPassword = false;
    this.authError = false;
    console.log(this.form);
    if (this.form.valid) {
      console.log("ANTES DE VALIDAR RUT: ");
      console.log(this.form.controls['rut'].value);
      console.log(this._validaRutService.validaRut(this.form.controls['rut'].value));
      if (this._validaRutService.validaRut(this.form.controls['rut'].value)) {
        this.credentials = this.form.value;
        this._authService.login(this.credentials).subscribe(() => {
          this.loggedIn.emit(null);
        }, (err) => {
          this.authError = true;
          this.alertRut = false;
          this.form.reset();
          console.error(err);
        });

      } else {
        console.log("NO VALIDO");
        this.messageAlertRut = "Rut inválido";
        this.alertRut = true;
      }
      
    } else {

      if (!this.form.controls['rut'].valid) {
        this.messageAlertRut = "Por favor, ingrese RUT"
        this.alertRut = true;        
      }
      if (!this.form.controls['password'].valid) 
        this.alertPassword = true;
      
    }


         
      
    
  }





}
