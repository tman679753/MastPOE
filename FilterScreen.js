import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

function FilterScreen({ route, navigation }) {
  const { menuItems } = route.params;  // Receive menuItems from params
  const [filteredItems, setFilteredItems] = useState(menuItems);
  const [selectedCourse, setSelectedCourse] = useState('All');

  const filterByCourse = (course) => {
    setSelectedCourse(course);
    if (course === 'All') {
      setFilteredItems(menuItems);
    } else {
      setFilteredItems(menuItems.filter(item => item.course === course));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Filter Menu Items</Text>
      <View style={styles.filterButtons}>
        {['All', 'Starters', 'Mains', 'Desserts'].map(course => (
          <Button key={course} title={course} onPress={() => filterByCourse(course)} />
        ))}
      </View>
      <FlatList
        data={filteredItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
      <Button title="Go Back to Add Items" onPress={() => navigation.goBack()} /> {/* Go back to AddItemsScreen */}
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
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  itemContainer: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default FilterScreen;
