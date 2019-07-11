"use strict";
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
//initialize a simple http server
//initialize the WebSocket server instance
const WsController = require('./controller/wsController.js')
const app = express();
//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({  server });

const send= (ws,data) =>{
    console.log(data)
    const d = JSON.stringify({
        jsonrpc: '2.0',
        ...data
    });
    ws.send(d);
}

const destStatus= (dest_ip)=>{
    let status = false;
    
    wss.clients.forEach(client=>{
        if(dest_ip === client._socket.remoteAddress){
            status = true;
        }
    })
    return status;
}

wss.on('connection', function connection(ws,req){
     
    console.log("Bienvenido desde : ", ws._socket.remoteAddress)
    
  
    ws.on('close',() => {
        console.log("Desconectado")
        
    })

    ws.on('message' ,(msg) => {
        const data = JSON.parse(msg);
     
        
        switch(data.method){
            
            case 'message':
               
                if(destStatus(data.params.to) == true){
                    wss.clients.forEach(client=>{
                        if(client._socket.remoteAddress == data.params.to){                       
                            send(client,{method: 'update',response:{status:'Success'},params:{message: data.params.message, from: ws._socket.remoteAddress}})
        
                        } 
                    })
                }
                else{
                    send(ws,{response:{status:'Error',message:"Usuario no está conectado"}})
                }
                break;
        }

    })

})


//start our server
server.listen(8999,'192.168.8.110', () => {
    console.log(`Server started on port 8999  :)`);
});

// { "method": "username", "params": { "username": "Tom" } }
// { "method": "message", "params": { "message": "Holamundo" } }