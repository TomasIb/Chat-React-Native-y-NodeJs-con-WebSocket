const users = []

const send= (ws,data) =>{
    const d = JSON.stringify({
        jsonrpc: '2.0',
        ...data
    });
    ws.send(d);
}

const is_username_taken = (username)=>{
    let taken = false;
    for(let i=0;i<users.length;i++){
        if(users[i].username === username){
            taken=true;
            break;
        }
    }
    return taken;
}


module.exports = (ws,req) => {


    console.log("Bienvenido desde : ", req.connection.remoteAddress)
    

    ws.on('close',() => {
        console.log("Desconectado")
    })

    ws.on('message' ,(msg) => {
        const data = JSON.parse(msg);
     
        
        switch(data.method){
            case 'username':
                if(is_username_taken(data.params.username)){
                    send(ws,{id: data.id , result:{status: 'El nombre de usuario ya existe.'}})
                }
                else{
                    users.push({username: data.params.username, ws: ws,});
                    send(ws,{id: data.id , result:{status:'success'}})
                    console.log('Agregado')
                }
                break;

            case 'message':
     
                
                users.forEach(user=>{
                    if(user.username == data.params.to){
                        

                        send(user.ws,{method: 'update',params:{message: data.params.message}})
                    }
                })
                break;

        }

    })
}

// { "method": "username", "params": { "username": "Tom" } }
// { "method": "message", "params": { "message": "Holamundo" } }