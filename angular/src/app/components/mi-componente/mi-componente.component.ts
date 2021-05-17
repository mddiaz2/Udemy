import {Component} from '@angular/core';

@Component({
    // debe llevar obligatoriamente dos propiedades 
    selector: 'mi-componente', //para indicar el nombre de la etiqueta html que se va a usar 
    templateUrl: './mi-componente.component.html'
})
export class MiComponente{ //exportar la clase llamada mi componente, cuando muestre mi componente se muestra el codigo html insertado en el template
    
    public titulo: string;
    public comentario: string;
    public year: number;
    public mostrarPeliculas: boolean;
    constructor(){
        this.titulo="Hola mundo soy mi componente";
        this.comentario="Este es mi primer componente";
        this.year= 2020;
        this.mostrarPeliculas=true;
        console.log("Componente mi-componente cargado");
        console.log(this.titulo, this.comentario, this.year);
    }
//para que el componente fucione se lo debe cargar en el app module

    ocultarPeliculas(){
        this.mostrarPeliculas=false;
    }

}//