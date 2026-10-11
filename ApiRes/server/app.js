const express = require('express');
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
});