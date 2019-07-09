import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput,TouchableOpacity} from 'react-native';
import Contacts from './Contacts';
import FlashMessage from "react-native-flash-message";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {YellowBox} from 'react-native';


   

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
        <View style={styles.container}>
            <FlashMessage style= {styles.toast} floating={false} ref="myLocalFlashMessage" hideStatusBar= {false} position="bottom"/> 
            <Text style={styles.title}>Agregar Contacto: </Text>
            <TextInput 
                style={styles.nameInput} 
                placeholder='Ingrese nombre'
                onChangeText = {(username) => {
                    this.handleusername(username)
                }}
                value={this.state.username}
                />
            <TextInput 
                style={styles.nameInput} 
                placeholder='Ingrese IP'
                onChangeText = {(ip) => {
                   this.handleIp(ip)
                }}
                value={this.state.ip}    
                />
            <TouchableOpacity>
    
                <Button
                    style = {styles.button}
                    icon={
                        <Icon
                        name='plus'
                        type='font-awesome'
                            size={15}
                            color="white"
                        />
                    }
                    title="Añadir"
                    onPress={()=>{
                        var contact = ({username: this.state.username, ip: this.state.ip ,avatar_url: 'https://i.pravatar.cc/100',})
                        
                        if(contact.username == "" || contact.ip == ""){
                            this.props.navigation.navigate('Contacts');
                        }else{

                        this.props.screenProps.contacts_list.push(contact)
                        console.log(this.props.screenProps.contacts_list)
                        this.setState({
                            contactsList: this.props.screenProps.contacts_list,
                            refreshing: true,

                        })
                        this.props.screenProps.refreshContactsFunction()
                        this.props.navigation.navigate('Contacts', this.state);
                        }
                        
                        
                    }}
                    
                />
            </TouchableOpacity>
        </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
      },
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
    toast:{
        flex: 1,
        backgroundColor:'gray'
    },
    button:{
        paddingTop:20,
        marginLeft:20,
        marginRight:20
    }

})
