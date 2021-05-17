export class Pelicula{

    /*
    

    constructor(title, year, image){
        this.title = title;
        this.year = year;
        this.image = image;
    }
    */
   constructor(
    public title: string,  //se separa con comas porque son parametros del objeto
    public year: number,
    public image: string
   ){}
}