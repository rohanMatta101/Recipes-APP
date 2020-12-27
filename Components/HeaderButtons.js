import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
//import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HeaderButtons=props=>{
    return <HeaderButton 
    {...props}
    IconComponent={Ionicons}
    iconSize={23}
    color="white"
    />
}
export default HeaderButtons;