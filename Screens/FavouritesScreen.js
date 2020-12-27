import React from 'react';
import { View,Text,StyleSheet,FlatList } from 'react-native';
import MealItems from '../Components/MealItems';
import { MEALS } from '../data/dummy-data';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderButton from '../Components/HeaderButtons';
import { connect } from 'react-redux';
import { Entypo } from '@expo/vector-icons'; 
const favouritesScreen=props=>{
    const renderList=itemData=>{
        //console.log(itemData);
        return (
            <MealItems title={itemData.item.title} duration={itemData.item.duration} affordability={itemData.item.affordability} complexity={itemData.item.complexity} image={itemData.item.imageUrl} onSelect={()=>props.navigation.navigate({routeName:'MealRecipe',params:{
                mealId: itemData.item.id,
                mealTitle : itemData.item.title
            }})}/>
        )
    }
    const toDisplayMeal = props.favouriteMeals//MEALS.filter(meal=>meal.id === 'm1' || meal.id === 'm2');//as each meal contains id of the category it belongs to
    
    if(toDisplayMeal.length === 0)
    {
       
       return(
        <View>
           <Text style={{fontSize:30,alignSelf:'center',color:'#21209c',marginTop:300}}>No Favourite Meals Found!</Text>
           <Entypo name="emoji-sad" size={48} color="#21209c" style={{alignSelf:'center',marginTop:30}} />
        </View>
       
        )
      
    }
    else{
        return(
            <View style={styles.screen} >
                <FlatList data={toDisplayMeal} renderItem={renderList}/>
            </View>
           )
    }

}
favouritesScreen.navigationOptions=navData=>{
    return{
    headerTitle:'My Favourites',
    headerLeft:<HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu" iconName="ios-menu" onPress={()=>{
            navData.navigation.toggleDrawer();
        }}/>
    </HeaderButtons>
    }

}
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
export default connect(mapStateToProps)(favouritesScreen);