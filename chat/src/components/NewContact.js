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
                    
                    this.props.screenProps.contacts_list.push(contact)
                    console.log(this.props.screenProps.contacts_list)
                    this.setState({
                        contactsList: this.props.screenProps.contacts_list,
                        refreshing: true,

                    })
                    this.props.screenProps.refreshContactsFunction()
                    this.props.navigation.navigate('Contacts', this.state);


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
