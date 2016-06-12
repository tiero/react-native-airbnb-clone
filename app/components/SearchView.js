'use strict'
import React, {
  Text,
  TextInput,
  StyleSheet,
  View,
  TabBarIOS,
  ListView,
  TouchableHighlight,
  Dimensions,
  Component,
  ActivityIndicatorIOS,
  Image
} from 'react-native'
import Flux, {
  Actions,
  Dispatch
} from 'react-native-router-flux'

//images
let rome = require('../img/rome.jpg')
let milan = require('../img/milan.jpg')

// Search Component
export default class SearchView extends Component{
  constructor(props){
    super(props)
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      selectedTab: 'searchTab',
      indirizzo: '',
      spinner: false,
      dataSource: ds.cloneWithRows(['Rome','Milan'])
    }
    this._renderSearch = this._renderSearch.bind(this)
    this._collection = this._collection.bind(this);

  }
  renderRow(data){
    let source = data === 'Rome' ? rome : milan
    return (
      <TouchableHighlight onPress={() => this._pressRow(data)}>

        <View>
          <View style={styles.row}>
            <Image source={source} style={styles.image}/>

            <Text style={styles.arrow}>
              >
            </Text>
          </View>
          <Text style={styles.text}>
            {data}
          </Text>
          <View style={styles.separator} />
        </View>

      </TouchableHighlight>
    );
  }
  render(){
      return (
        <TabBarIOS
        tintColor="white"
        barTintColor="#fd5c63">
        <TabBarIOS.Item
          title="Search"
          systemIcon="search"
          selected={this.state.selectedTab === 'searchTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'searchTab',
            });
          }}>
          {this._renderSearch()}
        </TabBarIOS.Item>
        </TabBarIOS>
      )
  }
	_renderSearch() {
    var content = <ListView
        ref="listview"
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps={true}
        showsVerticalScrollIndicator={false}
      />
		return (
    <View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchBarInput}
          onChangeText={(text) => this.setState({indirizzo:text, spinner: true})}
          placeholder={'Where are you going?'}
          onSubmitEditing={(text) => this._collection(text)}
        />
        <ActivityIndicatorIOS
            animating={this.state.spinner}
            style={styles.spinner}
          />
      </View>
      <View style={styles.listview}>
        {content}
      </View>
    </View>
    )
	}
  renderLoadingView() {
    return (
        <View style={styles.container}>
          <Text style={{color: '#fd5c63',fontSize: 60}}>Loading...</Text>
        </View>
    )
  }
  _pressRow(city){
    Actions.detail({city:city})
  }
  _collection(){
    Actions.collection({indirizzo:this.state.indirizzo});
  }
}
// Style our component
var styles= StyleSheet.create({
	day: {
    padding: 64,
		fontSize:18,
		color: '#0000FF'
	},
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding:64 ,
  },
  searchBar: {
    marginTop: 64,
    flexDirection: 'row',
  },
  searchBarInput: {
    fontSize: 15,
    flex: 1,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign:'center'
  },
  spinner: {
    width: 30,
  },
  listview: {
    height: Dimensions.get('window').height - 114,
    borderColor: 'gray',
    borderWidth: 1
  },
  row: {
   flexDirection: 'row',
   flexWrap: 'nowrap',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: 10,
   backgroundColor: '#fff',
   height: 250
 },
 separator: {
   height: 1,
   backgroundColor: '#e6e6e6',
 },
 text: {
   flex: 2,
   textAlign: 'center',
   color: 'black',
   fontSize: 16,
 },
 arrow: {
   fontSize: 19,
   marginBottom: 3,
   color: '#49bae6',
 },
 image: {
   height:250,
   width: Dimensions.get('window').width
 }
});
