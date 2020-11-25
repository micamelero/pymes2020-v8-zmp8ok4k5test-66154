import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { RouterModule } from '@angular/router';
import { APP_BASE_HREF} from '@angular/common';  
import { ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MyInterceptor } from "./shared/my-interceptor";

import {
  NgbPaginationModule,
  NgbModalModule
} from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./app.component";
import { MenuComponent } from "./components/menu/menu.component";
import { InicioComponent } from "./components/inicio/inicio.component";
import { ArticulosComponent } from "./components/articulos/articulos.component";
import { ArticulosFamiliasComponent } from "./components/articulos-familias/articulos-familias.component";
import { ModalDialogComponent } from "./components/modal-dialog/modal-dialog.component";
import { ContactosComponent } from './components/contactos/contactos.component';
import { ContactosService } from './components/contactos.service';
import { ContactosService } from './services/contactos.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    InicioComponent,
    ArticulosComponent,
    ArticulosFamiliasComponent,
    ModalDialogComponent,
    ContactosComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/inicio', pathMatch: 'full' },
      { path: 'inicio', component: InicioComponent },
      { path: 'articulos', component: ArticulosComponent },
      { path: 'articulosfamilias', component: ArticulosFamiliasComponent },
      { path: 'contactos', component: ContactosComponent }
    ]),
    NgbPaginationModule,
    NgbModalModule,
  ],
  entryComponents: [ModalDialogComponent],
  providers: [
     {provide: APP_BASE_HREF, useValue : '/' },
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true, providers: [ContactosService], providers: [ContactosService] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
