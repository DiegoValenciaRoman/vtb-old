import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidaRutService {

  constructor() { }


  // Valida el rut con su cadena completa "XXXXXXXX-X"
  private dv(T: any) {
    let M = 0;
    let S = 1;
    for (; T; T = Math.floor(T / 10))
      S = (S + T % 10 * (9 - M++ % 6)) % 11;
    return S ? S - 1 : 'k';
  }

  validaRut(rutCompleto: string) {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
      return false;
    let tmp = rutCompleto.split('-');
    let digv = tmp[1];
    let rut = tmp[0];
    if (digv == 'K') digv = 'k';
    console.log("ANTES DE RETORNAR VALIDACION");
    console.log(this.dv(rut)+"  "+digv);
    return (this.dv(rut) == digv);
  }
  

}
