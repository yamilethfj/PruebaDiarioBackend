const functions = require("firebase-functions");
const express = require("express");
const app = express();

const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp();
const db = getFirestore();

app.post("/formulario", async(req, res) =>{
    console.log(req.body.nombre);
    console.log(req.body.telefono);
    console.log(req.body.email);
    
    const nuevoUsuario = db.collection('usuarios').doc(req.body.nombre + req.body.telefono);

    var usuarioNuevo = await nuevoUsuario.set({ 
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        email: req.body.email,
        direccion:req.body.direccion
    });

    res.json({usuarioNuevo});
});

app.post("/test", async(req, res) =>{
    console.log(req.body.nombre);
    console.log(req.body.apellido);
    console.log(req.body.edad);
    
    const nuevoUsuario = db.collection('persona').doc(req.body.nombre + req.body.edad);

    var usuarioNuevo = await nuevoUsuario.set({ 
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad
    });

    res.json({usuarioNuevo});
});

app.get("/formulario",async(req, res) =>{
    console.log(req.query.nombre);
    console.log(req.query.telefono);
    console.log(req.query.email);
    const nuevoUsuario = db.collection('prueba').doc(req.query.email);
    var usuarioNuevo = await nuevoUsuario.set({ 
        nombre: req.query.nombre,
        telefono: req.query.telefono,
        email: req.query.email});

    res.json({usuarioNuevo});
    

});


const diario = functions.https.onRequest(app);
module.exports = {
    diario
}
