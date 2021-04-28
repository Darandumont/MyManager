import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    //Objeto Router que permite la navegación entre páginas.
    public router:Router
  ) {}

  //Método que recibe una página y va a ella.
  irAPagina(nuevaPagina){
    this.router.navigate([nuevaPagina]);
  }
}
