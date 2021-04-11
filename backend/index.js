'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;


mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_blog', {useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{
            console.log('Conexión a la base de datos exitosa');


            // Crear servidor y escuchar peticiones http

            app.listen(port, ()=>{
                console.log('servidor corriendo en http://localhost:'+port);
            })

})