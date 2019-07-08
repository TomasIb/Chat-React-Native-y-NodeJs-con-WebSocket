import React, { Component } from "react";
import { View, Text, FlatList,TouchableOpacity,StyleSheet ,Dimensions,Fragment} from "react-native";
import { ListItem,Icon } from "react-native-elements";
import { Chat } from "./Chat";



var {height, width} = Dimensions.get('window');




// const contactList = [
//     {
//       username: 'Amy Farha',
//       avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
//       ip: '192.168.0.27'
//     },
//     {
//       username: 'Chris Jackson',
//       avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
//       ip: '192.168.0.19'
//     },

//   ]

  

  
class Contacts extends Component {

    constructor(props){
      super(props)
      console.log(props)
      this.state = { 
        contactsList : props.screenProps.contactList,
        refreshing:false, 
        messages: [],
        historial_messages: props.screenProps.historial_messages
        }
      
      props.screenProps.refresh_contacts_list = this.loadMore.bind(this)
    
   
    }
    
    static navigationOptions = ({navigation,screenProps}) => ({
      title: 'Contactos',
      headerRight:(
                  <TouchableOpacity onPress={() => navigation.navigate('NewContact', state) }>
                    <Icon   name='user-plus' type='font-awesome' color='#F05D3D'  />
                  </TouchableOpacity>
      )
    });

    componentDidMount() {
      
      this.loadMore()
      
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
        onPress={()=>{ this.props.navigation.navigate('Chat',this.props.navigation.navigate('Chat',{historial_messages:this.props.screenProps.historial_messages, username:item.username , ip:item.ip}))}}
      />
    )
  
      _listEmptyComponent = () => {
        return (
          <View style={styles.container_empty}>
            <Text style={styles._text} > No hay contactos agregados </Text>
            
          </View>
        )
    }

  static renderRightButton = () => {
    return (
        <TouchableOpacity onPress={() => this.props.navigation.navigate('NewContact') }>
           <Icon   name='user-plus' type='font-awesome' color='#F05D3D' />
        </TouchableOpacity>
    );
}


loadMore = () => {
  this.setState({
    
    refreshing: true,
  },()=>{
    this.setState({
      contactsList : state.contactsList,
      refreshing:false
    })
  });

};

  render () {

        return(
        <View style={styles.container}>
          <FlatList
              keyExtractor={this.keyExtractor}
              data={this.props.screenProps.contacts_list}
              ListEmptyComponent={this._listEmptyComponent}
              renderItem={this.renderItem}
              extraData={state.contactsList}
              refreshing={this.state.refreshing}
              onRefresh = { this.loadMore}
              
            />
       
      
        </View>
        )
      }
}

export default Contacts;

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
 

});