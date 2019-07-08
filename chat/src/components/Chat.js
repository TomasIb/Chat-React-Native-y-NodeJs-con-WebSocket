import React, {Component} from 'react';


import { GiftedChat } from 'react-native-gifted-chat';
import { w3cwebsocket as W3CWebSocket } from "websocket";




export default class Chat extends Component{
    
    constructor(props){
        super(props)
        
        
        props.screenProps.socket.onmessage = this.handleMessage.bind(this);
          
        this.state={
            username:props.navigation.state.params.username,
            ip: props.navigation.state.params.ip,
            historial_messages: props.screenProps.historial_messages,
            messageToMe:   {   
                _id: '',
                text: '',
                createdAt: new Date(),
                user: {
                    _id: '',
                    name: '',
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
            let id = state.historial_messages.length
            this.setState({
                messageToMe:[{
                text :   data.params.message,
                _id: id,
                createdAt: new Date(),
                user:{
                    name: data.params.from,
                    _id: '2'
                }
                }]
            })
        console.log(this.state.messageToMe)
          this.onSend(this.state.messageToMe)

    
            
        }

    }
  
  
    static navigationOptions = ({ navigation }) => ({

        title: typeof(navigation.state.params)==='undefined' || typeof(navigation.state.params.username) === 'undefined' ? 'find': navigation.state.params.username,
        
    });



     componentWillMount() {
       
        let user_history = []
        state.historial_messages.forEach(element => {
           
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
      historial_messages: state.historial_messages.push(messages[0])
  
    }),

    
    
    )
  }
    

  
    render(){
        return(
            <GiftedChat
                messages={this.state.messages}
                
                onSend={(message)=>{
                    
                   
                    this.messageToServer.params.message = message[0].text
                    this.messageToServer.params.to = this.state.ip
                    
                    
                    this.props.screenProps.socket.send(JSON.stringify(this.messageToServer))
                    
                    this.onSend(message)
                    
                }}
                user={{
                    _id: '1',
                    name: this.state.ip,
                    
                }}
            />
        );
    }
}




