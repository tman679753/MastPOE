
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ScrollView, Image, TextInput } from 'react-native';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FilterScreen from './FilterScreen'; // Import the JS screen
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import AddItemsScreen from './AddItemsScreen';



// Define navigation stack parameters
type RootStackParamList = {
  Home: undefined;
  Add: { 
    NameSend: string; 
    DescriptionSend: string; 
    CourseSend: string; 
    PriceSend: string;
    CountSend: number;
  };
  FinalScreen: undefined;
  FilterScreen: { menuItems: { name: string; description: string; course: string; price: string }[] };
};

// Define the type for navigation prop in Home screen
type MainScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface MainScreenProps {
  navigation: MainScreenNavigationProp;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

// Main app component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name = "Add" component={AddItemsScreen} />
        <Stack.Screen name="FilterScreen" component={FilterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// HomeScreen component
function HomeScreen({ navigation }: MainScreenProps) {
  const [Dish, setDish] = useState('');
  const [Description, setDescription] = useState('');
  const [Course, setCourse] = useState('');
  const [Price, setPrice] = useState('');
  const [dishCount, setDishCount] = useState(0);

  return (
    <ScrollView style={{ padding: 20 }}>
      <View style={styles.mainPicture}>
        <Image style={styles.ImageSize} source={require('./_img/food_logo2.png')} />
      </View>
      <Text style={styles.welcomeText}>Add items to menu</Text>

      <Text>Enter Dish Name</Text>
      <TextInput
        style={styles.InputBoxs}
        placeholder="Dish Name"
        onChangeText={newText => setDish(newText)}
      />

      <Text>Enter Description</Text>
      <TextInput
        style={styles.InputBoxs}
        placeholder="Description"
        onChangeText={newText => setDescription(newText)}
      />

      <Text>Select Course</Text>
      <Picker selectedValue={Course} style={styles.picker} onValueChange={itemValue => setCourse(itemValue)}>
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Mains" value="Mains" />
        <Picker.Item label="Desserts" value="Desserts" />
      </Picker>

      <Text>Enter Price</Text>
      <TextInput
        style={styles.InputBoxs}
        placeholder="Price"
        onChangeText={newText => setPrice(newText)}
      />
      <StatusBar style="auto" />

      <Button
        title="Add dish"
        color="#9c7c38"
        onPress={() => {
          setDishCount(dishCount + 1);
          navigation.navigate('Add', {
            NameSend: Dish,
            DescriptionSend: Description,
            CourseSend: Course,
            PriceSend: Price,
            CountSend: dishCount + 1,
          });
        }}
      />

      <Button
        title="Done Adding Dishes"
        color="#9c7c38"
        onPress={() => {
          navigation.navigate('FinalScreen'); // Navigate to the final screen
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  welcomeText: {
    paddingTop: 40,
    color: '#9c7c38',
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
  },
  mainPicture: {
    paddingTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageSize: {
    width: 350,
    height: 350,
  },
  InputBoxs: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginVertical: 10,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  picker: {
    height: 50,
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
  },
});
