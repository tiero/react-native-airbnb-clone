
import React, {Component} from 'react';
import {
Text,
TextInput,
StyleSheet,
View,
ListView,
TouchableHighlight,
Image
} from 'react-native'
import {
  Actions,
} from 'react-native-router-flux';
//import ButtonFav from '../styles/button';

// Create our component
export default class DetailView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded:false,
      saved:false,
    }
  }

  //fetch from when the view is mounted
  componentDidMount() {
   this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL+this.props.id, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        this.setState({
          data: responseData,
          loaded: true,
        })
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
        return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <Image source={{uri:this.state.data.mainImage.server+'/300x300'+this.state.data.mainImage.uri}} style={styles.icon}/>
        <Text style={{color: '#0000FF',fontSize: 10}}>{this.state.data.listingId}</Text>
        <TouchableHighlight underlayColor='blue' onPress={() => this._savedData()}>
          <Text style={{color: 'red',fontSize: 20}}>
          Add to Favorites
          </Text>
        </TouchableHighlight>
        <Text style={{color: '#000',fontSize: 40}}>{this.state.data.title}</Text>
        <Text style={{color: '#000',fontSize: 20}}>Tipo: {this.state.data.propertyType}</Text>
        <Text numberOfLines={3} style={{color: '#000',fontSize: 20}}>Descrizione: {this.state.data.description}</Text>
      </View>
    );
  }

  renderLoadingView() {
    return (
        <View style={styles.container}>
          <Text style={{color: '#0000FF',fontSize: 60}}>Loading...</Text>
        </View>
    )
  }

  _savedData(){
    this.props.realm.write(() => {
      this.props.realm.create('Favorites', {id: this.state.data.listingId, title: this.state.data.title});
    });
    Actions.search({});
  }
}
var styles = StyleSheet.create({
 	container: {
    	flex: 1,
	    flexDirection: 'column',
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#f2f2f2',
	    borderStyle: 'solid',
	    borderBottomColor: 'grey',
	    borderBottomWidth: 1,
	    padding: 20,
  	},

	name: {
	    flex: 1,
	    marginLeft: 40
	},
	data: {
	    flex: 1,
	    marginLeft: -40
	},
	icon: {
	    width: 300,
	    height: 300,
	    padding: 8
	},
	topText: {
	    fontSize: 20,
	    marginBottom: 6,
	    textAlign: 'left',
	    color: '#0000FF'
	},
	bottomText: {
	    fontSize: 15,
	    textAlign: 'left',
	    color: '#000'
	},
	listView: {
        backgroundColor: '#f2f2f2',
        paddingTop: 64,
    },
});
