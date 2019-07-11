import React from "react";
import { View, Text,DeviceEventEmitter } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Chats from './components/Chats'
import Contacts from './components/Contacts'
import NewContact from './components/NewContact'
import Chat from './components/Chat'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { showMessage, hideMessage } from "react-native-flash-message";

var hostname = "192.168.8.110"
var port = "8999";
const socket = new W3CWebSocket("ws://192.168.8.110:8999");



historial_messages = []
contacts_list = []
chats_list = []
refreshChatsFunction = ""




socket.onmessage = function(e) {
    console.log("Received: '" + e.data + "'");
    data = JSON.parse(e.data)
    if(data.method == "update"){

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
  
      var username = data.params.from
        if(exist_chat(data.params.from) == false) {
          res = exist_contact(data.params.from)
          if(res != false)
            username = res
          chats_list.push({
            'username': username,
            'avatar_url': 'https://i.pravatar.cc/100',
            'ip': data.params.from
          })
        }

        if(exist_chat(data.params.from) == true) {
          res = exist_contact(data.params.from)
          if(res != false)
            chats_list.forEach(element =>{
              if(element.ip == data.params.from){
                  element.username = res
              }
            })
        }
        
         name = exist_contact(data.params.from)
         if(name == false){
            name = data.params.from
         }
        showMessage({
          message: name,
          description: data.params.message,
          type: "success",
        });
        
        DeviceEventEmitter.emit('eventKey', {name:'John', age:23});

     
     

    }

};

exist_chat = function(from){
  let exist = false;
  chats_list.forEach(element => {
    if(element.ip == from ){
      exist = true;    
      return exist;
    }
  });
  return exist;
}

exist_contact = function(from){
  let exist = false;
  contacts_list.forEach(element => {
    if(element.ip == from ){
      exist = element.username;
      return exist;
    }
  });
  return exist;
}

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
  constructor(props){
    super(props)
    console.log(props)
    

  }
  render() {
    
    return  <AppContainer screenProps={
                                    {socket: socket,
                                      historial_messages: historial_messages,
                                      onmessage: socket.onmessage.bind(this) ,
                                      contacts_list: contacts_list,
                                      refreshContactsFunction: "", 
                                      chats_list: chats_list, 
                                      refreshChatsFunction:"",
                                      
                                      }} />;
  
    
}  
}