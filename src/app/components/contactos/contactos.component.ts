import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"; 
import { ContactosService } from '../../services/contactos.service';
import { ModalDialogService } from "../../services/modal-dialog.service";
import { Contactos } from "../../models/contactos";


@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {
  Titulo = "Contactos";
  TituloAccionABMC = {
    A: "(Agregar)",
    C: "(Consultar)",
    L: "(Listado)"
    };
  Mensajes = {
  SD: " No se encontraron registros...",
  RD: " Revisar los datos ingresados..."
  };
  AccionABMC = "L"; // inicialmente inicia en el listado de articulos (buscar con parametros)
  submitted = false;
  Lista: any = [];
  FormReg: FormGroup;
  constructor( 
    public formBuilder: FormBuilder,
    private contactosService: ContactosService,
    private modalDialogService: ModalDialogService
    ) {
    
   }

  ngOnInit() {
    this.FormReg = this.formBuilder.group({
       //CREA OBJETO CUYAS PROPIEDADES ESTAN VINCULADAS AL HTML, A LA VARIABLE FORMREG
      //ANGULAR VA A BUILDEAR PROPIEDAD DEL OBJETO CON EL VALOR DEL ELEMENTO HTML
      IdContacto: [null],
      Nombre: [null, [Validators.required, Validators.maxLength(30)]],
      FechaNacimiento: [null, [Validators.required,Validators.pattern("(0[1-9]|[12][0-9]|3[01])[-/](0[1-9]|1[012])[-/](19|20)[0-9]{2}") ]],
      Telefono: [null, Validators.required, Validators.pattern("[0-9]{10}")],
           
    });
  this.getContactos();
  }

getContactos() { 

this.contactosService.get().subscribe((res: Contactos[]) => {
this.Lista = res
});

  }
  Consultar(){
  this.AccionABMC = "C";
  }

  Agregar(){

    this.AccionABMC = "A";
     this.FormReg.reset();
    this.submitted = false;
    this.FormReg.markAsUntouched();
    
  }
    
 Volver() {
    this.AccionABMC = "L";
  }

Grabar() {
    this.submitted = true;
    
    if (this.FormReg.invalid) {
      return;
    }
    
    const itemCopy = { ...this.FormReg.value }; 
    
    var arrFecha = itemCopy.FechaNacimiento.substr(0, 10).split("/");
    if (arrFecha.length == 3)
      itemCopy.FechaNacimiento = 
          new Date(
          arrFecha[2],
          arrFecha[1] - 1,
          arrFecha[0]
          ).toISOString();
        
                   
    // agregar post
    //SI NO HAY ID ES ALTA 
    if (itemCopy.IdContacto == 0 || itemCopy.IdContacto == null) {
      itemCopy.IdContacto = 0;
      this.contactosService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert("Registro agregado correctamente.");
      });
    } else {
      // modificar put
      this.contactosService
        .put(itemCopy.IdContacto, itemCopy)
        .subscribe((res: any) => {
          this.Volver();
          this.modalDialogService.Alert("Registro modificado correctamente.");
        });
    }
   
}
}



