"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const app = express();
//initialize a simple http server
const server = http.createServer(app);
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
const users = [{ username: '', ws: null }];
const send = (ws, data) => {
    const d = JSON.stringify(Object.assign({ jsonrpc: '2.0' }, data));
    ws.send(d);
};
const is_username_taken = (username) => {
    let taken = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            taken = true;
            break;
        }
    }
    return taken;
};
wss.on('connection', function (ws, req) {
    ws.on('message', (msg) => {
        const data = JSON.stringify(msg);
        switch (data.method) {
            case 'username':
                if (is_username_taken(data.params.username)) {
                    ws.send({ id: data.id, error: { message: 'El nombre de usuario ya existe.' } });
                }
                else {
                    users.push({ username: data.params.username, ws: ws, });
                    ws.send({ id: data.id, result: { status: 'success' } });
                }
                break;
            case 'message':
                users.forEach(user => {
                    ws.send({ method: 'update', params: { message: data.params.message } });
                });
                break;
        }
    });
});
//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port 8999  :)`);
});
//# sourceMappingURL=server.js.map