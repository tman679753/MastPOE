
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



const menuItems = [
    { name: 'Salad', course: 'Starters', price: 50 },
    { name: 'Soup', course: 'Starters', price: 30 },
    { name: 'Steak', course: 'Mains', price: 120 },
    { name: 'Pasta', course: 'Mains', price: 100 },
    { name: 'Cake', course: 'Desserts', price: 70 },
    { name: 'Ice Cream', course: 'Desserts', price: 50 },
  ];
  
  export default function HomeScreen({ navigation }) {
    const calculateAverages = () => {
      const courses = ['Starters', 'Mains', 'Desserts'];
      const averages = courses.map(course => {
        const items = menuItems.filter(item => item.course === course);
        if (items.length === 0) return { course, average: 0 };
        const total = items.reduce((sum, item) => sum + item.price, 0);
        return { course, average: (total / items.length).toFixed(2) };
      });
      return averages;
    };
  
    const averages = calculateAverages();
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image style={styles.logo} source={require('./_img/food_logo2.png')} />
        <Text style={styles.title}>Average Prices by Course</Text>
        {averages.map((item, index) => (
          <Text key={index} style={styles.averageText}>
            {item.course}: ${item.average}
          </Text>
        ))}
        <Button
          title="Go to Add Items"
          color="#9c7c38"
          onPress={() => navigation.navigate('Add')}
        />
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#f8f8f8',
    },
    logo: {
      width: 150,
      height: 150,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#9c7c38',
    },
    averageText: {
      fontSize: 18,
      marginVertical: 5,
      color: '#333',
    },
  });
