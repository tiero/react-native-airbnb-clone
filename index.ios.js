/**
 * Proof of concept listing App
 * React Native: https://github.com/facebook/react-native
 * Dev: http://vulpem.com
 */
'use strict';
import React, {
  AppRegistry,
  Component,
} from 'react-native'
import Flux, {
	Router,
	Route,
	Schema,
	Animations,
} from 'react-native-router-flux'
import SearchView from './app/components/SearchView'
import CollectionView from './app/components/CollectionView'
import DetailView from './app/components/DetailView'
//Realm
const Realm = require('realm');
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
      	<Route name='search' component={SearchView}  sceneStyle={{ borderBottom: '#49bae6' }} initial={true} navigationBarStyle={{color: "#000"}} title='aiRNbnb' type='reset' />
  		  <Route name='collection' title='Rome' component={CollectionView} />
        <Route name='detail' title='Attico near Colosseum' component={DetailView} />
			</Router>
		)
	}
}
AppRegistry.registerComponent('airnbnb', () => airbnb)
