/*Example of Pre-Populated SQLite Database in React Native*/
import React from 'react';

//Import react-navigation
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

//Import external files
import HomeScreen from './pages/HomeScreen';
import RegisterPlant from './pages/RegisterPlant';
import UpdatePlant from './pages/UpdatePlant';
import ViewPlant from './pages/ViewPlant';
import ViewAllPlants from './pages/ViewAllPlants';
import DeletePlant from './pages/DeletePlant';

const App = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Plant Symbosis',
      headerStyle: {backgroundColor: '#f05555'},
      headerTintColor: '#ffffff',
    },
  },
  View: {
    screen: ViewPlant,
    navigationOptions: {
      title: 'View Plant',
      headerStyle: {backgroundColor: '#f05555'},
      headerTintColor: '#ffffff',
    },
  },
  ViewAll: {
    screen: ViewAllPlants,
    navigationOptions: {
      title: 'View All Plants',
      headerStyle: {backgroundColor: '#f05555'},
      headerTintColor: '#ffffff',
    },
  },
 Update: {
    screen: UpdatePlant,
    navigationOptions: {
      title: 'Update User',
      headerStyle: {backgroundColor: '#f05555'},
      headerTintColor: '#ffffff',
    },
  },
  Register: {
    screen: RegisterPlant,
    navigationOptions: {
      title: 'Add Plant',
      headerStyle: {backgroundColor: '#f05555'},
      headerTintColor: '#ffffff',
    },
  },
  Delete: {
    screen: DeletePlant,
    navigationOptions: {
      title: 'Delete Plant',
      headerStyle: {backgroundColor: '#f05555'},
      headerTintColor: '#ffffff',
    },
  },
});
export default createAppContainer(App);
