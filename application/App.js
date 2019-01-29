import {createStackNavigator,createAppContainer} from 'react-navigation';
 
import Home from './components/home';
import AddMenu from './components/addMenu';
import Success from './components/success';
import Details from './components/details';

//Je mets en place ma navigation ainsi que mes différentes vues
 
const RootStack = createStackNavigator({
  Home: { screen: Home }, 
  AddMenu: { screen: AddMenu }, 
  Details: {screen: Details},
  Success: {screen: Success}
  },
  {
    initialRouteName: 'Home',
  }
);
const App = createAppContainer(RootStack);
export default App;