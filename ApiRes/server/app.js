/*const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const helmet =require("helmet");

const server = express();
server.name = "TheMenthorServer"
server.use(express());

server.use(express.urlencoded({extended:true, limit:'50mb'}));
server.use(express.json({limit:'50mb'}));
server.use(cors());
server.use((err, req, res, next)=>{
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status.send(message));
});*/
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const routes = require("./routes");

const server = express();
server.name = "TheMenthorServer";

// Helmet bloquea por defecto las peticiones a otros dominios.
// Tu Pokédex necesita llamar a pokeapi.co y cargar imágenes de GitHub.
server.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "connect-src": ["'self'", "https://pokeapi.co"],
        "img-src": ["'self'", "data:", "https://raw.githubusercontent.com"],
      },
    },
  })
);
server.use(cors());
server.use(morgan("dev"));
server.use(express.urlencoded({ extended: true, limit: "10mb" }));
server.use(express.json({ limit: "10mb" }));

// Sirve los archivos de /public (index.html se muestra en "/")
server.use(express.static(path.join(__dirname, "..", "public")));

// Tu API queda bajo /api
server.use("/api", routes);

// El manejador de errores siempre al final
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;