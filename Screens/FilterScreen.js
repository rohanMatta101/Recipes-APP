import React,{ useState,useEffect,useCallback } from 'react';
import { View,Text,StyleSheet,Switch } from 'react-native';
//import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import { connect } from 'react-redux';
import HeaderButton from '../Components/HeaderButtons';
import { setFilters } from '../Store/Actions/mealActions';
import { useDispatch } from 'react-redux'

const filtersScreen=props=>{
    //const { navigation } = props;
    const [isGlutenFree,setIsGlutenFree] =useState(false);
    const [isLactoseFree,setIsLactoseFree] = useState(false);
    const [isVegan,setIsVegan]=useState(false);
    const [isVegetarian,setIsVegetarian]=useState(false);
    const dispatch=useDispatch();
    const savedFilters=useCallback(()=>{
        const appliedFilters={
            GlutenFree:isGlutenFree,
            LactoseFree:isLactoseFree,
            Vegan:isVegan,
            Vegetarian:isVegetarian
        }
        console.log(appliedFilters);
        dispatch(setFilters(appliedFilters))
    },[isGlutenFree,isLactoseFree,isVegan,isVegetarian,dispatch]);
    useEffect(()=>{
        props.navigation.setParams({ save : savedFilters}); //used for passing/exchanging data between component and navigationOptions.
    },[savedFilters])
    return (
        
        <View style={styles.screen}>
            <Text style={{fontFamily:'open-sans-bold',fontSize:24,color:'#21209c',alignSelf:'center',borderRadius:15,borderWidth:2,borderColor:'grey',padding:10}}>Add Filters to Meals</Text>
            <View style={{flexDirection:"row",justifyContent:"space-evenly",marginTop:25}}> 
                <Text style={{fontSize:18}}>Gluten-Free</Text>
                <Switch value={isGlutenFree} onValueChange={newVal=>setIsGlutenFree(newVal)} trackColor={{
                    true:'#21209c',
                    false:''
                }}/>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-evenly",marginTop:25}}> 
                <Text style={{fontSize:18}}>Lactose-Free</Text>
                <Switch value={isLactoseFree} onValueChange={newVal=>setIsLactoseFree(newVal)} trackColor={{
                    true:'#21209c',
                    false:''
                }}/>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-evenly",marginTop:25}}> 
                <Text style={{fontSize:18}}>Vegan</Text>
                <Switch value={isVegan} onValueChange={newVal=>setIsVegan(newVal)} trackColor={{
                    true:'#21209c',
                    false:''
                }}/>
            </View>
            <View style={{flexDirection:"row",justifyContent:"space-evenly",marginTop:25}}> 
                <Text style={{fontSize:18}}>Vegetarian</Text>
                <Switch value={isVegetarian} onValueChange={newVal=>setIsVegetarian(newVal)} trackColor={{
                    true:'#21209c',
                    false:''
                }}/>
            </View>

        </View>
        
    )

}
filtersScreen.navigationOptions = navData=>{
  return {
      headerTitle:'Filters',
      headerStyle:{
        backgroundColor:'#21209c'
      },
      headerTintColor:"white",
      headerLeft:<HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Menu" iconName="ios-menu"  onPress={()=>{
              navData.navigation.toggleDrawer();
          }}/>
      </HeaderButtons>,
      headerRight:<HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Save" iconName="ios-save"  onPress={navData.navigation.getParam('save')}/>
      </HeaderButtons>

  }
}
const styles=StyleSheet.create({
    screen:{
      flexDirection:'column',
      justifyContent:"center",
      margin:20
    }
})
const mapStateToProps=(state)=>{
    return{
        meals : state.meals.meals,
        filteredMeals : state.meals.filteredMeals,
        favouriteMeals : state.meals.favouriteMeals
    }
}
export default connect(mapStateToProps)(filtersScreen);