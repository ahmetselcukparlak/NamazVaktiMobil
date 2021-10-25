import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Vakit from './src/Screen/Vakit/Index';
import Konum from './src/Screen/Konum/Index';

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Vakit">
      <Drawer.Screen name="Konum" component={Konum} />
      <Drawer.Screen name="Vakit" component={Vakit} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
const Drawer = createDrawerNavigator();