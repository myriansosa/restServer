const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

//conexión con la base de datos
const {connection} = require("../config.db");

const getprofesor = (request, response) => {
    connection.query("SELECT * FROM profesor", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

//ruta
app.route("/profesor")
.get(getprofesor);


const postprofesor = (request, response) => {
    const {dni, nombre, apellido} = request.body;
    connection.query("INSERT INTO carta(dni, nombre, apellido) VALUES (?,?,?) ", 
    [dni, nombre, apellido],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Item añadido correctamente": results.affectedRows});
    });
};

//ruta
app.route("/profesor")
.post(postprofesor);


const delprofesor = (request, response) => {
    const id = request.params.id;
    connection.query("Delete from profesor where id = ?", 
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Item eliminado":results.affectedRows});
    });
};

//ruta
app.route("/profesor/:id")
.delete(delprofesor);


module.exports = app;