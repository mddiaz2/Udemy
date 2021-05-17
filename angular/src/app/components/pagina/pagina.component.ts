import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {

  public nombre: string;
  public apellidos: string;

  constructor(
    private _route: ActivatedRoute, //sacar parametros de la url
    private _router: Router          //realizar redirecciones
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe((params: Params)=>{
      this.nombre = params.nombre;
      this.apellidos = params.apellidos;

    });

  }
  redireccion(){
    this._router.navigate(['/pagina-de-prueba', 'Danilo', 'Diaz']);
  }

}
