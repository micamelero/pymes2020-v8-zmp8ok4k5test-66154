import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { of } from "rxjs";
import { Contactos } from "../models/contactos";

@Injectable({
  providedIn: "root"
})
export class ContactosService {
 resourceUrl: string;
  constructor(private httpClient: HttpClient) {
  this.resourceUrl = " https://pav2.azurewebsites.net/api/contactos";
  }
 get():any { 
    return this.httpClient.get(this.resourceUrl);
  
  }
getById(Id: number) { //ACA PEDIMOS NOS RETORNE POR UN ID PASADO COMO PARAMETRO
    return this.httpClient.get(this.resourceUrl + Id);
    //CON LA URL TIENE AL FINAL / LE PONEMOS + ID Y NOS VA A DEVOLVER EL ARTICULO QUE CORRESPONDE A ESE ID 
  }
   post(obj: Contactos) {
    return this.httpClient.post(this.resourceUrl, obj);
    //LE PASO A LA URL EL , OBJ PARA QUE LE AGREGUE ESE VALOR OBJ

  }

  put(Id: number, obj: Contactos) {
    return this.httpClient.put(this.resourceUrl + Id, obj);
    //LE PASO A LA URL EL ID DEL ARTICULO Y , OBJ PARA QUE EN ESA POSICION DEL ID LE AGREGUE ESE VALOR OBJ
  }

}
