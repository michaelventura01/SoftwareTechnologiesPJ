const express = require('express');
const server = express();
const cors = require('cors');
const { Technology } = require('../models');

server.use(express.json());
server.use(express.static(__dirname+"/../public"));
server.use(cors());

server.get("/api/technologies", async (request, response) => {
    let technologies = await Technology.find();
    technologies = technologies.map((technology)=>{
        technology.logo  = `${request.protocol}://${request.headers.host}/img/${technology.logo}`;
        return technology;
    });
    return response.send({
        error:false, 
        data:technologies
    });
});

server.get("/api/technology/:id", async (request, response) => {
    const { id } = request.params;


    let technology = await Technology.findById(id);
    technology.logo  = `${request.protocol}://${request.headers.host}/img/${technology.logo}`;
    
    return response.send({
        error:false, 
        data:technology
    });
});

server.get("/api/technology/search/:name", async (request, response) => {
    const { name } = request.params;

    let technologies = await Technology.find({
        name: { $regex: new RegExp(name, "i")}
    });
    
    technologies = technologies.map((technology)=>{
        technology.logo  = `${request.protocol}://${request.headers.host}/img/${technology.logo}`;
        return technology;
    });
    return response.send({
        error:false, 
        data:technologies
    });
});


module.exports = server;

