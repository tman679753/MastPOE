import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

function HomeScreen({ navigation }) {
  const [menuItems, setMenuItems] = useState([]);

  // Calculate average prices by course
  const calculateAverages = () => {
    const courses = ['Starters', 'Mains', 'Desserts'];
    let averages = {};
    courses.forEach(course => {
      const items = menuItems.filter(item => item.course === course);
      const total = items.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
      averages[course] = items.length ? (total / items.length).toFixed(2) : 'N/A';
    });
    return averages;
  };

  const averages = calculateAverages();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Complete Menu</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>{item.course}</Text>
            <Text>Price: {item.price}</Text>
          </View>
        )}
      />
      <Text style={styles.averageText}>Average Prices:</Text>
      {Object.entries(averages).map(([course, avg]) => (
        <Text key={course}>{`${course}: ${avg}`}</Text>
      ))}
      <Button
        title="Add Items"
        onPress={() => navigation.navigate('AddItems', { menuItems, setMenuItems })}
      />
      <Button
        title="Filter Menu"
        onPress={() => navigation.navigate('FilterScreen', { menuItems })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  averageText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
