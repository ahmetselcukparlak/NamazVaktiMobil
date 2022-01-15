import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons,Entypo } from '@expo/vector-icons';

import Vakit from './src/Screen/Vakit/Index';
import Konum from './src/Screen/Konum/Index';



export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Konum" screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}>
      
      <Tab.Screen name="Konum" component={Konum} options={{
         
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Vakit" component={Vakit} options={{
         
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clock" color={color} size={size} />
          ),
        }}/>
       
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const Tab = createBottomTabNavigator();