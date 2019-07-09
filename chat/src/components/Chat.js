import React, {Component} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {YellowBox} from 'react-native';




export default class Chat extends Component{
    
    constructor(props){
        super(props)
        
        YellowBox.ignoreWarnings(['Warning:']);
        props.screenProps.socket.onmessage = this.handleMessage.bind(this);
          
        this.state={
            username:props.navigation.state.params.username,
            ip: props.navigation.state.params.ip,
            historial_messages: props.screenProps.historial_messages,
            avatar:props.navigation.state.params.avatar,
            messageToMe:   {   
                _id: '',
                text: '',
                createdAt: new Date(),
                user: {
                    _id: '',
                    name: '',
                    avatar: props.navigation.state.params.avatar
                }
            },
        }
    }

   
  componentWillUnmount = () => {
        this.props.screenProps.socket.onmessage = this.props.screenProps.onmessage;
       console.log("CHAAOOAOOAOAOAO")
  };
  
 
  

     handleMessage(e){
         console.log(e.data)
       let  data = JSON.parse(e.data)
        if(data.method == "update"){
            let id = this.props.screenProps.historial_messages.length
            this.setState({
                messageToMe:[{
                text :   data.params.message,
                _id: id,
                createdAt: new Date(),
                user:{
                    name: data.params.from,
                    _id: '2',
                    
                }
                }]
            })
        console.log(this.state.messageToMe)
        this.onSend(this.state.messageToMe)   

     
        this.newChat(data.params.from)
        console.log(this.props.screenProps.chatsList)
        this.props.screenProps.refreshChatsFunction()

        

        }

            

    }
    

    exist_chat(from){
        let exist = false;
        this.props.screenProps.chats_list.forEach(element => {
          if(element.ip == from ){
            exist = true;
            return exist;
          }
        });
        return exist;
    }

    exist_contact(from){
        let exist = false;
        this.props.screenProps.contacts_list.forEach(element => {
          if(element.ip == from ){
            exist = element.username;
            return exist;
          }
        });
        return exist;
    }

  newChat(from){
    if(this.exist_chat(from) == false){
        let username = from
        res = this.exist_contact(from)

        if(res != false) 
            username = res

        this.exist_contact(from);
        console.log("asdsad")
        this.props.screenProps.chats_list.push({
            'username': username,
            'ip': from
        })
  }


  if(exist_chat(from) == true) {
    res = exist_contact(from)
    if(res != false)
      chats_list.forEach(element =>{
        if(element.ip == from){
            element.username = res
          
        }
      })
  }
  console.log(this.props.screenProps.chats_list)
}
      
      
  
  
    static navigationOptions = ({ navigation }) => ({

        title: typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.username) === 'undefined' ? 'find': navigation.state.params.username,
        
    });



     componentWillMount() {
       
        let user_history = []
        this.state.historial_messages.forEach(element => {
           
            if(element.user.name == this.state.ip || element.user.name == this.state.username){
                user_history.push(element)
            }
        });
        user_history.reverse()
        
        this.setState({
          messages: user_history
        })
    }
 

  


    messageToServer = { 
        method: 'message',
        params:{message: '',to: ''}
    }





  onSend(messages = []) {
      
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
      historial_messages: this.props.screenProps.historial_messages.push(messages[0])
  
    }),

    
    
    )
  }
    

  
    render(){
        return(
            <GiftedChat
                messages={this.state.messages}
                placeholder="Escribe un mensaje..."
                onSend={(message)=>{
                    
                   
                    this.messageToServer.params.message = message[0].text
                    this.messageToServer.params.to = this.state.ip
                    this.newChat(this.state.ip)
                    this.props.screenProps.refreshChatsFunction()
                    
                    
                    this.props.screenProps.socket.send(JSON.stringify(this.messageToServer))
                    
                    this.onSend(message)
                    
                }}
                user={{
                    _id: '1',
                    name: this.state.ip,
                    // avatar: this.state.avatar
                    
                }}
            />
        );
    }
}




