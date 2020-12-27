import React from 'react';
import { View,Text,StyleSheet, Button,FlatList } from 'react-native';
//import { CATEGORIES } from '../data/dummy-data';
//import { MEALS } from '../data/dummy-data';
import MealItems from '../Components/MealItems';
import { connect } from 'react-redux';
import { Entypo } from '@expo/vector-icons'; 
const categoryMealScreen=props=>{
    let catId=props.navigation.getParam('categoryId');
    //let catTitle=props.navigation.getParam('categoryTitle');
    const renderList=itemData=>{
        //console.log(itemData);
        return (
            <MealItems title={itemData.item.title} duration={itemData.item.duration} affordability={itemData.item.affordability} complexity={itemData.item.complexity} image={itemData.item.imageUrl} onSelect={()=>props.navigation.navigate({routeName:'MealRecipe',params:{
                mealId: itemData.item.id,
                mealTitle : itemData.item.title
            }})}/>
        )
    }
    
    const toDisplayMeal = props.filteredMeals.filter(meal=>{
        if(meal.categoryId.indexOf(catId) >= 0)
        {
            return true;
        }
        else{
            return false;
        }
        
    });//as each meal contains id of the category it belongs to
    console.log(toDisplayMeal);
    if(toDisplayMeal.length === 0)
    {
        return (
            <View >
                <Text style={{fontSize:27,alignSelf:'center',color:'#21209c',marginTop:300}}>No Meals Found For This Filter!</Text>
           <Entypo name="emoji-sad" size={45} color="#21209c" style={{alignSelf:'center',marginTop:30}} />
            </View>
        )
    }else{
    return (
        <View style={styles.screen} >
            <FlatList data={toDisplayMeal} renderItem={renderList}/>
        </View>
    )
    }

}
categoryMealScreen.navigationOptions=(navigationData)=>{
    //console.log(navigationData);//along with navigationOptions we also get some props/options to use
    const catTitle = navigationData.navigation.getParam('categoryTitle');
    return{
        headerTitle:catTitle,
        headerStyle:{
            backgroundColor:'#21209c'
        },
        headerTintColor:"white"
    }
    
}
/* both methods can be used for making this .navigationOptions  the above one can be used for outputting data more dynamically
categoryMealScreen.navigationOptions={
    headerTitle:catTitle,
        headerStyle:{
            backgroundColor:'#21209c'
        },
        headerTintColor:"white"
}*/
const styles=StyleSheet.create({
    screen:{
      flex:1,
      justifyContent:"center",
      alignItems:"center"
    }
})
const mapStateToProps=(state)=>{
    return{
        meals : state.meals.meals,
        filteredMeals : state.meals.filteredMeals,
        favouriteMeals : state.meals.favouriteMeals
    }
}
export default connect(mapStateToProps)(categoryMealScreen);
//we come to this page when we press on a particular category for eg indian . we will see all indian meal recipes here