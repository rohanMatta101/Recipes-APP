import React,{useEffect,useCallback} from 'react';
import { View,Text,StyleSheet,ScrollView,Image } from 'react-native';
//import { MEALS } from '../data/dummy-data';
import { HeaderButtons , Item }  from 'react-navigation-header-buttons';
import HeaderButton from '../Components/HeaderButtons';
import { connect,useDispatch } from 'react-redux';
import { toggleFavourites } from '../Store/Actions/mealActions'; 


const mealRecipeScreen=props=>{
    //console.log(props.navigation.getParam('instructions'));
    //console.log(props.navigation.getParam('ingredients'))
    const mealId = props.navigation.getParam('mealId');
    const selectedMeal = props.meals.find(meal => meal.id === mealId);
    const isMealFav = props.favouriteMeals.findIndex(meal=>meal.id === selectedMeal.id);
    let isFav;
    if(isMealFav>=0)
    {
        isFav=true;
    }
    else{
        isFav=false;
    }
    const dispatch=useDispatch();
    const toggleFavHandler=useCallback(()=>{
        dispatch(toggleFavourites(selectedMeal.id))
    },[dispatch,mealId])
    useEffect(()=>{
        props.navigation.setParams({
            toggleFav:toggleFavHandler
        })
    },[toggleFavHandler])
    useEffect(()=>{
        props.navigation.setParams({
            isFavourites : isFav
        })
    },[isFav])
    /*
    const toggleFavHandler=()=>{
        props.onToggleFav(selectedMeal.id)
    }
    */ 
    
    return (
        <ScrollView>
        <View >
            <Image source={{uri:selectedMeal.imageUrl}} style={styles.image}/>
        </View>
        <View style={styles.details}>
               <Text>{selectedMeal.duration}Min</Text>
               <Text>{selectedMeal.affordability}</Text>
               <Text>{selectedMeal.complexity}</Text>
        </View>
        <Text style={{fontFamily:'open-sans-bold',fontSize:20,marginTop:10,marginBottom:10,marginLeft:10,color:'#21209c'}}>Ingredients : </Text>
        <View style={{marginLeft:5}}>
            {selectedMeal.ingredients.map(ingredient=>{
                return <Text style={{marginBottom:5}}>-- {ingredient}</Text>
            })}
        </View>
        <Text style={{flex:1,justifyContent:"center",fontFamily:'open-sans-bold',fontSize:20,marginTop:10,marginBottom:10,marginLeft:10,color:'#21209c'}}>Instructions : </Text>
        <View style={{marginLeft:5}}>
            {selectedMeal.steps.map(step=>{
                return <Text style={{marginBottom:5}}>-- {step}</Text>
            })}
        </View>
        </ScrollView>
    )

}
mealRecipeScreen.navigationOptions=(navigationData)=>{
    //const mealId = navigationData.navigation.getParam('mealId');
    const mealTitle = navigationData.navigation.getParam('mealTitle') //when passing data between component and navOptions here 1 method is to use setParams (last lecture of recipe app module) and other method is to simply pass the name of the meal as a param i.e that is from categoryMealScreen
    //const selectedMeal = MEALS.find(meal => meal.id === mealId);
    const togfav= navigationData.navigation.getParam('toggleFav');
    const isFav = navigationData.navigation.getParam('isFavourites');
    return {
      headerTitle:mealTitle,
      headerRight:<HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Favorite" iconName={isFav ? 'ios-star' : 'ios-star-outline'} onPress={togfav}/>
      </HeaderButtons>
    }
}
const styles=StyleSheet.create({
    image:{
      width:'100%',
      height:300,
      
      borderRadius:15,
      borderWidth:2,
      borderColor:'grey'
    },
    details:{
        flexDirection:"row",
        justifyContent:"space-between",
        marginHorizontal:20,
        marginTop:20,
        borderRadius:15,
        borderWidth:2,
        borderColor:'grey',
        padding:10
    }
})
const mapStateToProps=(state)=>{
    return{
        meals : state.meals.meals,
        filteredMeals : state.meals.filteredMeals,
        favouriteMeals : state.meals.favouriteMeals
    }
}
/*const mapDispatchToProps = (dispatch)=>{
    return{
        onToggleFav:(mealId)=>dispatch(toggleFavourites(mealId))
    }
}*/
export default connect(mapStateToProps)(mealRecipeScreen);
//this page shows recipe for a particular meal