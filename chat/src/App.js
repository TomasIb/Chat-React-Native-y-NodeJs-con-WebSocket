import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Chats from './components/Chats'
import Contacts from './components/Contacts'



import NewContact from './components/NewContact'
import Chat from './components/Chat'
import { w3cwebsocket as W3CWebSocket } from "websocket";

var hostname = "192.168.0.9"
var port = "8999";
const socket = new W3CWebSocket("ws://192.168.0.9:8999");


 historial_messages = []



socket.onmessage = function(e) {
    console.log("Received: '" + e.data + "'");
    data = JSON.parse(e.data)
    if(data.method == "update"){
      console.log(historial_messages)
      let id = historial_messages.length

      msg= {
          text : data.params.message,
          _id: id,
          createdAt: new Date(),
          user:{
              _id: '2',
              name: data.params.from
          }
          
      }

      historial_messages.push(msg)
      //PUSH
      

      
        
  
        
    }

};
socket.onopen = function() {
  console.log('WebSocket Client Connected');
}





const AppNavigator = createStackNavigator({
  Chats: {
    screen: Chats
  },
  Contacts:{
    screen: Contacts
  },
  NewContact:{
    screen: NewContact
  },
  Chat:{
    screen: Chat
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

  
  
  render() {
    

    return <AppContainer screenProps={{socket: socket,historial_messages: historial_messages,onmessage:socket.onmessage.bind(this)}} />;
  }




  
}