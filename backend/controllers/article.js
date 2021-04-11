// importación de librerias y declaracion de nuevas sentencias para javascript
'use strict'
var validator = require ('validator');
var Article = require ('../models/article');


var validator = require('validator');
var fs = require ('fs');
var path = require('path');

//const article = require('../models/article');
var Article = require('../models/article');
const article = require('../models/article');
const { exists } = require('../models/article');
//const { param } = require('../routes/article');




var controller = {

    datosCurso: (req, res) => {

        var hola = req.body.hola;

        return res.status(200).send({
            curso: 'Aprendiendo Frameworks JS',
            autor: 'Danilo Diaz',
            url: 'danilo.es',
            hola
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la acción test de mi controlador de articulos'

        });
    },
    save: (req, res) => {
        //recoger parametros por post
        var params = req.body;
        //console.log(params);

        //validar datos - libreria validator
        try {
            var validate_title =!validator.isEmpty(params.title);
            var validate_content =!validator.isEmpty(params.content);
        } catch (error) {
            
        return res.status(200).send({
            status : 'error',
            message: 'faltan datos por enviar'
        });
            
        }

        if(validate_title && validate_content){
            //crear objeto a guardar 
            var article = new Article();



            //asignar valores 
            article.title = params.title;
            //console.log(params.title);

            article.content= params.content;
            //console.log(params.content);
            article.image = null;


            //guardar articulo
            article.save((err, articleStored) =>{

                if(err || !articleStored){
                    return res.status(404).send({
                        status : 'error',
                        message: 'El articulo no se ha guardado'
                       });
                }
                //devolver respuesta 
                    return res.status(200).send({
                    status : 'success',
                    article: articleStored
                
            });

            });

        }else{
           return res.status(200).send({
              status : 'error',
              message: 'Los datos no son validos6'
             });
        }
    },

    getArticles: (req, res) => {

        var query =  Article.find({});

        var last = req.params.last;
        //console.log(last);
        if (last || last !=undefined){
            query.limit(5);

        }

        //Find --> sacar datos de la bd
        query.sort('_id').exec((err, articles) => {  //sort para ordena, con el menor es para ordenar desscendente, de mas nuevo a mas viejo

            if(err) {
                return res.status(500).send({
                status : 'error',
                message: 'Error al devolver los datos'
               });
            }

            if(!articles) {
                return res.status(404).send({
                status : 'error',
                message: 'No hay articulos para mostrar'
               });
            }

            return res.status(200).send({
                status : 'success',
                articles
               });


        });

     
    },

    getArticle: (req, res) =>{

        //recoger el id de la URL
        var articleId = req.params.id;

        //Comprobar que existe 
        if (!articleId || articleId == null){
            return res.status(404).send({
                status : 'error',
                message: 'No existe el articulo'
            });

        }

        //Buscar el articulo 
        Article.findById(articleId, (err, article) =>{

            if (err || !article){
                return res.status(404).send({
                    status : 'error',
                    message: 'No existe el articulo'
                });
            }
            //Devolverlo en JSON
            return res.status(404).send({
                status : 'success',
                article
            });

        });
    },

    update : (req, res) =>{
        //recoger el id del articulo por la url
        var articleId = req.params.id;


        //recoger los datos por put
        var params = req.body;

        //validar los datos
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(200).send({
                status : 'success',
                message: 'Faltan datos por enviar'
            });
        }

        if(validate_title && validate_content){
              //find and update
              Article.findOneAndUpdate({_id : articleId}, params, {new:true}, (err, articleUpdate) =>{
                  if(err){
                    return res.status(500).send({
                        status : 'success',
                        message: 'Error al actualizar'
                    });

                  }

                  if(!articleUpdate){
                    return res.status(404).send({
                        status : 'success',
                        message: 'No existe el articulo'
                    });
                }
                return res.status(200).send({
                    status : 'success',
                    article: articleUpdate
                });

              });
        }else{
            //devolver respuesta
                    return res.status(200).send({
                        status : 'success',
                        message: 'La validación no es correcta'
                    });

        
        } 
    },

    delete: (req, res) =>{

        //recoger id de la url 
        var articleId= req.params.id;


        //find and delete 
        Article.findOneAndDelete({_id:articleId}, (err, articleRemoved) =>{
            if(err){
                return res.status(500).send({
                    status : 'error',
                    message: 'Error al borrar'
                }); 

            }

            if(!articleRemoved){
                return res.status(404).send({
                    status : 'error',
                    message: 'No se ha borrado el articulo, posiblemente no existe'
                });
            }

            return res.status(200).send({
                status: 'success',
                article: articleRemoved
            });
        });
    },

    upload: (req, res) =>{
        
    
        //configurar el modulo de connect multiparty router/article.js

        //Recoger el fichero de la peticion 
        var file_name = 'imagen no subida';

        if(!req.files){
            return res.status(404).send({
                status : 'error',
                message: file_name
            });

        }

        //Conseguir el nombre y la extension del archivo 

        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

         // * ADVERTENCIA * EN LINUX O MAC
        // var file_split = file_path.split('/');

        //nombre del archivo
        var file_name = file_split[2];

        //extension del fichero
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

        //Comprobar la extension, solo imagenes y si no es valida borrar el fichero
        if(file_ext !='png' && file_ext !='jpg' && file_ext !='jpeg' && file_ext !='gif' ){
            // borrar archivo

            fs.unlink (file_path, (err)=>{
                return res.status(200).send({
                    status: 'error',
                    message: 'La extension de la imagen no es valida'
                 });

            });
        }else{
        //Si todo es valido, scando id de la url
        var articleId = req.params.id;

        //Buscar articulo y asignarle nombre de la imagen y actualizarlo
        Article.findOneAndUpdate({_id: articleId}, {image: file_name}, {new:true}, (err, articleUpdated)=>{
            
            if(err|| !articleUpdated){
                return res.status(200).send({
                    status: 'error',
                    article: 'Error al guardar la imagen del articulo'
                 });

            }
           
            return res.status(200).send({
                status: 'success',
                article: articleUpdated
             });
        });
        }
    
    },// end upload file 

    getImage: (req, res)=> {
        var file = req.params.image;
        var path_file = './upload/articles/'+file;

        fs.exists(path_file, (exists)=>{
            
            if (exists){
                return res.sendFile(path.resolve(path_file));

            }else{
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe'
                 });

            }
        });
      
    }


}; // end controler
       
module.exports = controller;