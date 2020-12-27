import React from 'react';
import { View,Text,StyleSheet,FlatList,TouchableOpacity,TouchableNativeFeedback,Platform } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import HeaderButton from '../Components/HeaderButtons';
const categoriesScreen=props=>{
    let TouchableCmp=TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >=21)
    {
        TouchableCmp=TouchableNativeFeedback;
    }
    const renderGrid=(itemData)=>{
        return (
            <TouchableCmp  style={{...styles.gridItems,backgroundColor:itemData.item.color}} onPress={()=>props.navigation.navigate({routeName:'CategoriesMeals',params:{
                categoryId:itemData.item.id,
                categoryTitle:itemData.item.title
            }})}>
            <View >
                <Text style={{color:'white',fontSize:18,fontFamily:'open-sans-bold'}}>{itemData.item.title}</Text>
            </View>
            </TouchableCmp>
            
        )
    }
   return (<FlatList  numColumns={2} data={CATEGORIES} renderItem={renderGrid} />);
}
categoriesScreen.navigationOptions=navData=>{ //used for setting various properites of a screen/page being rendered using  navigation
    return{
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
    },
    gridItems:{
        flex:1,
      margin:17,
      padding:5,
      height:150,
      borderRadius:16,
      alignItems:"flex-end",
      justifyContent:'flex-end',
      shadowColor:'black',
      shadowOffset:{width:0,height:5},
      shadowOpacity:0.3,
      elevation:3
    }
})
export default categoriesScreen;
//this page contains all options like italian, indian , mexican etc