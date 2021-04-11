var nombre= "Danilo Diaz" /* declaracion de variables */
var altura= 170;

/*
var concatenacion = nombre + " " + altura;

//document.write(concatenacion); imprimir variables por pantalla

var datos = document.getElementById("datos");
//datos.innerHTML= concatenacion;
// Plantillas JS, ABAJO 
datos.innerHTML= `
<h1> Soy la caja de datos </h1> 
<h2> Mi nombre es : ${nombre} </h2>
<h3> Mido: ${altura} </h3>
`;

if(altura >=190){
    datos.innerHTML += ` <h1>  Eres una persona alta </h1>  `;
}else{
    datos.innerHTML += ` <h1>  Eres una persona baja</h1>  `;
}

for(var i=2000; i<=2020; i++){
    //bloque de instrucciones

    datos.innerHTML += "<h2> Estamos en el año: "+ i;
}
*/
function MuestraMiNombre(nombre, altura){
var misDatos= `
<h1> Soy la caja de datos </h1> 
<h2> Mi nombre es : ${nombre} </h2>
<h3> Mido: ${altura} </h3>
`;
return misDatos
}

function imprimir(){
var datos = document.getElementById("datos");
datos.innerHTML = MuestraMiNombre("Danilo Diaz Aponte1", 190) ;

}

imprimir();


var nombres = ['Daniel', 'Damian', 'Dalila']; //coleccion de datos


document.write('<h1>Listado de Nombres </h1>')

/*
for(i=0; i <nombres.length; i++){
    document.write(nombres[i] + '<br/>');
}
*/

nombres.forEach((nombre) =>{
    document.write(nombre + '<br/>');
});

// Objetos JSON o literales

var coche ={
    modelo : 'Mercedes Clase A',
    maxima: 500,
    antiguedad: 2020,
    mostrarDatos(){
        console.log(this.modelo, this.maxima, this.antiguedad);

    },
    propiedad1: "valor aleatorio"
};

document.write("<h1>"+coche.antiguedad+"</h1>")
coche.mostrarDatos();

//Promesas 

var saludar = new Promise((resolve, reject) =>{
    setTimeout(() => {
        let saludo = "Hola muy buenas a todos!";
        saludo = false;

        if(saludo){
            resolve (saludo);
        }else {
            reject('No hay saludo disponible');
        }
    }, 2000);
});

saludar.then(resultado => {
    alert(resultado);
})
.catch(err =>{
    alert(err)
});