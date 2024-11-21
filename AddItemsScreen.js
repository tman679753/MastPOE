
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker

function AddItemsScreen({ route, navigation }) {
  const { menuItems, setMenuItems } = route.params; // Receive menuItems and setMenuItems from params

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  const addItem = () => {
    setMenuItems([...menuItems, { name, description, course, price }]);
    setName('');
    setDescription('');
    setCourse('');
    setPrice('');
  };

  const removeItem = (index) => {
    const updatedItems = menuItems.filter((_, i) => i !== index);
    setMenuItems(updatedItems);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Menu Items</Text>
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Course Type:</Text>
        <Picker
          selectedValue={course}
          onValueChange={(value) => setCourse(value)}
          style={styles.picker}
        >
          <Picker.Item label="Select a course" value="" />
          <Picker.Item label="Starters" value="Starters" />
          <Picker.Item label="Mains" value="Mains" />
          <Picker.Item label="Desserts" value="Desserts" />
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Button 
        title="Add Item" 
        onPress={addItem} 
        color="#9c7c38" 
      />
      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text>{item.name}</Text>
            <Button 
              title="Remove" 
              onPress={() => removeItem(index)} 
              color="#9c7c38" 
            />
          </View>
        )}
      />
      <Button 
        title="Go to Filter Items" 
        onPress={() => navigation.navigate('Filter', { menuItems })} 
        color="#9c7c38" 
      />
      <Button 
        title="Go Back" 
        onPress={() => navigation.goBack()} 
        color="#9c7c38" 
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
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default AddItemsScreen;






