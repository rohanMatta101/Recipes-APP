import {createStackNavigator} from 'react-navigation-stack';//this us the method used for version 4
import  {createAppContainer}  from 'react-navigation'; //always import this from 'react-navigation' no matter which version
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import CategoriesScreen from '../Screens/CategoriesScreen';
import CategoriesMealsScreen from '../Screens/CategoryMealsScreen';
import { Platform } from 'react-native'
import MealRecipeScreen from '../Screens/MealRecipeScreen';
import FavoritesScreen from '../Screens/FavouritesScreen';
import FilterScreen from '../Screens/FilterScreen';

//forming a stack to represent different pages
const MealsNavigator = createStackNavigator({
    Categories : {
        screen:CategoriesScreen,
        navigationOptions:{headerTitle: 'Meals',
        
        //speicific navOptions
        }
    },//page 1
    CategoriesMeals : CategoriesMealsScreen,//page 2
    MealRecipe :{
      screen:MealRecipeScreen
    } //page 3 (right hand part shows what/which component to be rendered when we come to this particular page) & (left hand)
},
{ 
    mode:'modal',
    defaultNavigationOptions:{ //default navoptions fro every page
        headerStyle:{
            backgroundColor:'#21209c',
        },
        headerTintColor:"white",
        headerTitleStyle:{
           fontFamily:'open-sans-bold',
           fontSize:15
        },
        headerBackTitle:'Back',
        headerBackTitleStyle:{
            fontFamily:'open-sans'
        }
    }
});
const favNavigator = createStackNavigator({
    Favourites : FavoritesScreen ,
    mealDetail : MealRecipeScreen
},{
    mode:'modal',
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'#21209c'
        },
        headerTintColor:"white"
    }
})
const mealTabNavigator = Platform.OS === 'ios'? createBottomTabNavigator({
    Meals : {screen:MealsNavigator,navigationOptions:{
        tabBarIcon : (tabInfo)=>{
            return <MaterialCommunityIcons name="food-fork-drink" size={24} color="#21209c" />
        }
    }},
    Favourites : {screen: favNavigator,navigationOptions:{
        tabBarIcon : (tabInfo)=>{
            return <MaterialIcons name="favorite" size={24} color="#21209c" />
        }
    }}
},{
    tabBarOptions:{
        activeTintColor:'#21209c',
         }
}): createMaterialBottomTabNavigator({
    Meals : {screen:MealsNavigator,navigationOptions:{
        tabBarIcon : (tabInfo)=>{
            return <MaterialCommunityIcons name="food-fork-drink" size={24} color="#21209c" />
        }
    }},
    Favourites : {screen: favNavigator,navigationOptions:{
        tabBarIcon : (tabInfo)=>{
            return <MaterialIcons name="favorite" size={24} color="#21209c" />
        }
    }}

}
)
const filterNavigator = createStackNavigator({
    Filters : FilterScreen
})
const mainNavigator= createDrawerNavigator({
  Meals : mealTabNavigator,
  Filters : filterNavigator
},{
    contentOptions:{
        activeBackgroundColor:'#21209c',
        activeTintColor:'white'
    }
})

export default createAppContainer(mainNavigator);