import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import {Pelicula} from '../../models/pelicula';

@Component({
  selector: 'peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {
  public titulo: string;
  public peliculas: Pelicula[];
  public favorita: Pelicula;
  public fecha: any;

  constructor() { 
    this.titulo= "Componente peliculas";
    this.peliculas =[
      new Pelicula ("Spiderman 4", 2019, "https://cronicaglobal.elespanol.com/uploads/s1/61/11/50/7/main-700b9bff30.jpeg"),
      new Pelicula ("Vengadores", 2021, "https://ichef.bbci.co.uk/news/640/cpsprodpb/BF0D/production/_106090984_2e39b218-c369-452e-b5be-d2476f9d8728.jpg"),
      new Pelicula ("Batman vs Superman", 2020, "https://i.blogs.es/503736/batman-v-superman-la-pelicula-2016-imagen-blogdecine/1366_2000.jpg"),
      
    ];
    this.fecha = new Date (2021, 5, 12);
    
  }

  ngOnInit(){
    console.log(this.peliculas);
    console.log("Componente iniciado");
  }

  ngDoCheck(){
    console.log("Dochek lanzado");
  }
  cambiarTitulo(){
    this.titulo= "El titulo ha sido cambiado con exito";
  }
  ngOnDestroy(){
    console.log("El componente se va a eliminar");
  }
  mostrarFavorita(event){
    this.favorita = event.pelicula;
  }

}
