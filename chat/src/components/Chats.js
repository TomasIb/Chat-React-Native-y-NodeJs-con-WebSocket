import React, { Component } from "react";
import { View, Text, FlatList,TouchableOpacity,StyleSheet ,Dimensions,Alert,DeviceEventEmitter} from "react-native";
import { ListItem } from "react-native-elements";
import { Icon } from 'react-native-elements'
import FlashMessage from "react-native-flash-message";
import equal from 'fast-deep-equal'
import {YellowBox} from 'react-native';

var {height, width} = Dimensions.get('window');

const list = [
    // {
    //   username: 'ANDROID',
    //   avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //   ip: '192.168.0.6'
    // },
    // {
    //   username: 'MAC',
    //   avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    //   ip: '192.168.0.9'
    // },

  ]

  

class Chats extends Component {
    constructor(props){
    super(props)
    YellowBox.ignoreWarnings(['Warning:']);
    this.state = {  
          chatsList: props.screenProps.chatsList,
          refreshing: false,
          contactsList : props.screenProps.contactsList,
          messages: [],
          historial_messages: props.screenProps.historial_messages,
          
          
          
    }

    props.screenProps.refreshChatsFunction = this.loadData.bind(this)
    this.eventListener = DeviceEventEmitter.addListener('eventKey',this.loadData);
    }


    static navigationOptions ={
      title: 'Chats',
    }

    componentDidUpdate(prevProps) {
      if(!equal(this.props.contactsList, prevProps.contactsList)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
      {
        // this.updateUser();
        console.log(asdsa)
      }
    } 

   

    componentDidMount() {
      this.loadData()
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
          // this.refs.toast.show(this.props.screenProps.push_message,DURATION.LENGTH_LONG);
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




loadData = () => {
  this.setState({
    refreshing: true,
  },()=>{
    this.setState({
      chatsList : this.state.chatsList,
      refreshing:false
    })
  });

};


      
  render () {
    return(
    <View style={styles.container}>
   
      <FlashMessage style= {styles.toast} floating={true} ref="myLocalFlashMessage" hideStatusBar= {false} position="bottom"/> 
   
      <FlatList
          keyExtractor={this.keyExtractor}
          data={this.props.screenProps.chats_list}
          ListEmptyComponent={this._listEmptyComponent}
          renderItem={this.renderItem}
          extraData={this.state.chatsList}
          refreshing={this.state.refreshing}
          onRefresh = {this.loadData}
      />
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Contacts',this.state)}
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
    backgroundColor: '#007aff', 
    borderRadius: 30, 
    elevation: 8 
    }, 
    toast:{
      flex: 1,
      backgroundColor:'gray',
      opacity: 0.5
    }
});