
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
import Flux, {
  Actions,
  dispatch
} from 'react-native-router-flux';


// Create our component
var CollectionView = React.createClass({
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      loaded: false,
      netError: false,
      dataSource: ds.cloneWithRows({}),
    }
  },

  //fetch from API
  componentDidMount() {
    this.fetchData();
  },

  fetchData() {
    fetch(encodeURI(REQUEST_URL))
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.tieredResults[0].results),
          loaded: true,
        });
      })
      .catch((error) => {
        if (error) {
          this.setState({
            netError: true,
          })
        }
      })
      .done();
  },

  render() {
    if (this.state.netError) {
      return this.renderErrorMessage();
    }

    if (!this.state.loaded) {
        return this.renderLoadingView();
    }

    return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          style={styles.listView}
        />
    );
  },

  renderLoadingView() {
    return (
        <View style={styles.container}>
          <Text style={{color: '#0000FF',fontSize: 60}}>Loading...</Text>
        </View>
    )
  },

  renderErrorMessage() {
    return (
        <View style={styles.container}>
          <Text style={{color: '#0000FF',fontSize: 60}}>Service unavailable</Text>
        </View>
    )
  },

  renderRow(row) {
     let image = row.mainImage.server+'/100x100'+row.mainImage.uri;
    return(
      <TouchableHighlight
        underlayColor='#11a45b'
        onPress={() => this.pressRow(row.listingId)}
        >
        <View style={styles.container}>
          <Image style={styles.icon} source={{uri: image}} />
          <View style={styles.name}>
             <Text style={styles.topText}>{row.title}</Text>
             <Text style={styles.bottomText}>{row.listingId}</Text>
          </View>
          <View style={styles.data}>
             <Text style={styles.topText}>{row.price.display}</Text>
          </View>

        </View>
      </TouchableHighlight>
    )
  },

  pressRow(rowID){
    Actions.detail({id:rowID});
  }


});

var styles = StyleSheet.create({
 	container: {
    	flex: 1,
	    flexDirection: 'row',
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
	    marginLeft: 20
	},
	data: {
	    flex: 1,
	},
	icon: {
      flex: 1,
	    width: 70,
	    height: 70,
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


//Make this code avilable elsewhere
module.exports = CollectionView;
