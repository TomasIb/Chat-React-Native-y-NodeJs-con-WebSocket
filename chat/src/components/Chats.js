import React, { Component } from "react";
import { View, Text, FlatList,TouchableOpacity,StyleSheet ,Dimensions,Alert} from "react-native";
import { ListItem } from "react-native-elements";
import { Icon } from 'react-native-elements'
import Toast, {DURATION} from 'react-native-easy-toast'
var {height, width} = Dimensions.get('window');

const list = [
    {
      username: 'ANDROID',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      ip: '192.168.0.6'
    },
    {
      username: 'MAC',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      ip: '192.168.0.9'
    },

  ]

  

class Chats extends Component {
    constructor(props){
      super(props)
      console.log(props) 
      state = {  contactsList : props.screenProps.contactsList,   historial_messages: props.screenProps.historial_messages}
      
    }
    static navigationOptions ={
      title: 'Chats',
    }

  
   
    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        
      <ListItem
        title={item.username}
        subtitle={item.ip}
        leftAvatar={{
          source: item.avatar_url && { uri: item.avatar_url },
          title: item.username[0]
        }}
        onPress={()=>{ 
          this.refs.toast.show(this.props.screenProps.push_message,DURATION.LENGTH_LONG);
          this.props.navigation.navigate('Chat',{historial_messages:this.props.screenProps.historial_messages, username:item.username , ip:item.ip})
     
      }}
      />
    )
    
    _listEmptyComponent = () => {
      return (

        <View style={styles.container_empty}>
          <Text style={styles._text} > No hay chats disponibles </Text>    
        </View>
      )
    }


      
  render () {
    return(
    <View style={styles.container}>
      <Toast ref="toast" position="top" positionValue={120} fadeInDuration = {1000}  style={styles.toast}/>
      <FlatList
          keyExtractor={this.keyExtractor}
          data={list}
          ListEmptyComponent={this._listEmptyComponent}
          renderItem={this.renderItem}
        />
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Contacts',state)}
      style={styles.fab}>
      <Icon reversed name='users' type='font-awesome' color='#ffffff' />
    </TouchableOpacity>
  
    </View>
    )
  }
}


export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_empty:{
    justifyContent: 'center',
    alignItems: 'center',
    flex:1
  },
  _text:{
    paddingVertical:(height/2)-100,
    fontSize: 25,
    color: "#000" 
  },
  fab: { 
    position: 'absolute', 
    width: 56, 
    height: 56, 
    alignItems: 'center', 
    justifyContent: 'center', 
    right: 20, 
    bottom: 20, 
    backgroundColor: '#F05D3D', 
    borderRadius: 30, 
    elevation: 8 
    }, 
    toast:{
      top:-120,
      backgroundColor:'gray',
    }
});