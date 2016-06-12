/**
 * Proof of concept listing App
 * React Native: https://github.com/facebook/react-native
 * Dev: http://vulpem.com
 */
import React, {Component} from 'react'
import { AppRegistry } from 'react-native'
import {
	Router,
	Scene,
} from 'react-native-router-flux'
import SearchView from './app/components/SearchView'
import CollectionView from './app/components/CollectionView'
import DetailView from './app/components/DetailView'
//Realm
import Realm from 'realm';
//Realm Schema
const Trip = {
  name: 'Trip',
  properties: {
    // The following property types are equivalent
    id: 'string',
    host: 'string',
    huest: 'string',
    start: 'string',
    end: 'string'
  }
}
//init a let for Realm instance
let realm = new Realm({schema: [Trip]});
class airbnb extends Component {
  render() {
		return (
			<Router realm={realm} navigationBarStyle={{backgroundColor: '#fd5c63'}}>
      	<Scene key='search' component={SearchView}  sceneStyle={{ borderBottom: '#49bae6' }} initial={true} navigationBarStyle={{color: "#000"}} title='aiRNbnb' type='reset' />
  		  <Scene key='collection' component={CollectionView} />
        <Scene key='detail' component={DetailView} />
			</Router>
		)
	}
}
AppRegistry.registerComponent('airnbnb', () => airbnb)
