import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './homepage'; // JS file
import AddItemsScreen from './AddItemsScreen'; // JS file

// Define types for navigation params
type RootStackParamList = {
  Home: { menuItems: MenuItem[], setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>> };
  Add: undefined;  // Params not needed in Add screen
};

// Define menu item type
type MenuItem = {
  name: string;
  course: string;
  price: string;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  // State for menu items
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { name: 'Salad', course: 'Starters', price: '50' },
    { name: 'Soup', course: 'Starters', price: '30' },
    { name: 'Steak', course: 'Mains', price: '120' },
    { name: 'Pasta', course: 'Mains', price: '100' },
    { name: 'Cake', course: 'Desserts', price: '70' },
    { name: 'Ice Cream', course: 'Desserts', price: '50' },
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Pass menuItems and setMenuItems to HomeScreen */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ menuItems, setMenuItems }}
        />
        <Stack.Screen name="Add" component={AddItemsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
