import {Injectable} from '@angular/core';
import {Pelicula} from '../models/pelicula';

@Injectable()

export class PeliculaService{

    public peliculas: Pelicula[];

    constructor(){
        this.peliculas =  [
            new Pelicula ("Spiderman 4", 2019, "https://cronicaglobal.elespanol.com/uploads/s1/61/11/50/7/main-700b9bff30.jpeg"),
            new Pelicula ("Vengadores", 2021, "https://ichef.bbci.co.uk/news/640/cpsprodpb/BF0D/production/_106090984_2e39b218-c369-452e-b5be-d2476f9d8728.jpg"),
            new Pelicula ("Batman vs Superman", 2020, "https://i.blogs.es/503736/batman-v-superman-la-pelicula-2016-imagen-blogdecine/1366_2000.jpg"),
            
          ];
    }
    holaMundo(){
        return 'Hola mundo desde un servicio de Angular';
    }
    getPeliculas(){
        return this.peliculas;
       
    }
}