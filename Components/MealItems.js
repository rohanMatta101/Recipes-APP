import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity,ImageBackground } from 'react-native';

const mealItems=props=>{

   return (
       <View style={styles.fullview} >
       <TouchableOpacity onPress={props.onSelect}>
           <View style={{height:'82%',width:'100%'}}>
               <ImageBackground source={{uri:props.image}} style={styles.image}>
               <Text style={styles.title}>{props.title}</Text>
               </ImageBackground>

           </View>
           <View style={styles.mealDetails}>
               <Text>{props.duration}Min</Text>
               <Text>{props.affordability}</Text>
               <Text>{props.complexity}</Text>
           </View>
       </TouchableOpacity>
       </View>
   )
}
const styles=StyleSheet.create({
   fullview:{
       height:250,
       width:'100%',
       backgroundColor:"white",
       padding:15,
       marginTop:5,
       borderWidth:1.5,
       borderColor:'grey',
       borderRadius:15
   },
   image:{
      width:'100%',
      height:'100%',
      justifyContent:'flex-end'
    },
      
   mealDetails:{
       marginTop:20,
       flexDirection:"row",
       justifyContent:"space-between",
       borderTopColor:'grey',
       borderTopWidth:1.5,
   },
   title:{
       fontFamily:'open-sans-bold',
       fontSize:20,
       backgroundColor:'rgba(0,0,0,0.5)',
       color:'white'
   }
})
export default mealItems;