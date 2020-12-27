import React,{ useState } from 'react';
import { StyleSheet,View,Text } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import MealNavigator from './navigation/mealsNavigator';
import {enableScreens} from 'react-native-screens';
import { createStore,combineReducers } from 'redux';
import { Provider } from 'react-redux';
import MealReducer from './Store/Reducers/mealReducer';
enableScreens();
const fetchFonts=()=>{
  return Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
  })
}
const rootReducer = combineReducers({
  meals : MealReducer
})
const store = createStore(rootReducer);
export default function App() {
  const [fontsLoaded,setFontLoaded]=useState(false);
  if(!fontsLoaded)
  {
    return <AppLoading startAsync={fetchFonts} onFinish={()=>setFontLoaded(true)} onError={(err)=>console.log(err)}/>
  }
  return <Provider store={store}><MealNavigator /></Provider>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
