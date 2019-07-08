import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput,TouchableOpacity} from 'react-native';
import Contacts from './Contacts';


   

export default class NewContact extends Component{
    constructor(props){
        super(props)
        console.log(props)
  
    }
    
    state = {method:"add" ,username:'',ip:''}

    handleusername=(username)=>{
        this.setState({
            username: username

        })
    }

    handleIp=(ip)=>{
        this.setState({
            ip:ip
        })
    }
   
  
    render(){
        return(
            <View>
            <Text style={style.title}>Agregar Contacto: </Text>
            <TextInput 
                style={style.nameInput} 
                placeholder='Ingrese nombre'
                onChangeText = {(username) => {
                    this.handleusername(username)
                }}
                value={this.state.username}
                />
            <TextInput 
                style={style.nameInput} 
                placeholder='Ingrese IP'
                onChangeText = {(ip) => {
                   this.handleIp(ip)
                }}
                value={this.state.ip}    
                />
            <TouchableOpacity
                onPress={()=>{
                    var contact = ({username: this.state.username, ip: this.state.ip ,avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',})
                    console.log(this.props.navigation.state)
                    this.setState({
                        contactsList: this.props.navigation.state.params.contactsList.push(contact)

                    })
                    this.props.handler
                    this.props.navigation.navigate('Contacts', {
                       contactsList: this.props.navigation.state.params.contactList,
                       refreshing: true
                    });


                    // // // this.props.addItem("asdas")
                //  this.handleAddItem("asdas");
                    
                }}
            >
                <Text style={style.buttonText}>Aceptar</Text>
            </TouchableOpacity>
            </View>
        );
    }
}

var style = StyleSheet.create({
    title: {
        marginTop: 20,
        marginLeft: 20,
        fontSize: 20,
    },
    nameInput: {
        padding: 5,
        height: 40,
        borderWidth: 2,
        borderColor: 'black',
        margin: 20,
    },
    buttonText: {
        marginLeft: 20,
        fontSize: 20,
    },
})
