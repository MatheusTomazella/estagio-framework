//require('dotenv').config();
//const process   = require( 'process' );
const express   = require( 'express' );
const app       = express();
const http      = require( 'http' ).Server( app );

app.use( express.static(__dirname + '/public') );

/* Index.html */
app.get( '/', function( request, response ){
    response.sendFile( __dirname + '/public/home/index.html' );
} );

/* posts.html */
app.get( '/posts', function( request, response ){
    response.sendFile( __dirname + '/public/posts/index.html' );
} );

/* albums.html */
app.get( '/albums', function( request, response ){
    response.sendFile( __dirname + '/public/albums/index.html' );
} );

/* todo.html */
app.get( '/todo', function( request, response ){
    response.sendFile( __dirname + '/public/todo/index.html' );
} );

http.listen( process.env.PORT || 3306, ( error ) => {
    if ( error ) throw error;
    console.log( 'Server Started' );
} );
