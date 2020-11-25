import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { of } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class ContactosService {
 resourceUrl: string;
  constructor(private httpClient: HttpClient) {
  this.resourceUrl = " https://pav2.azurewebsites.net/api/contactos/";
  }
getById(Id: number) { //ACA PEDIMOS NOS RETORNE POR UN ID PASADO COMO PARAMETRO
    return this.httpClient.get(this.resourceUrl + Id);
    //CON LA URL TIENE AL FINAL / LE PONEMOS + ID Y NOS VA A DEVOLVER EL ARTICULO QUE CORRESPONDE A ESE ID 
  }
}
