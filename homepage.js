import React from 'react';
import { ScrollView, Text, Button, Image, StyleSheet, FlatList, View } from 'react-native';

function HomeScreen({ route, navigation }) {
  const { menuItems, setMenuItems } = route.params; // Get menuItems and setMenuItems from route params

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.logo} source={require('./_img/food_logo2.png')} />
      <Text style={styles.title}>
        Welcome to Chritofells Delights. Please view the average price of our courses below:
      </Text>

      {/* Code to calculate and display average prices */}
      {['Starters', 'Mains', 'Desserts'].map((course) => {
        const courseItems = menuItems.filter(item => item.course === course);
        const average =
          courseItems.length > 0
            ? (courseItems.reduce((acc, item) => acc + parseFloat(item.price), 0) / courseItems.length).toFixed(2)
            : '0.00';
        return (
          <Text key={course} style={styles.averageText}>
            {course}: R{average}
          </Text>
        );
      })}

      {/* Total Menu Items */}
      <Text style={styles.totalItems}>
        Total Menu Items: {menuItems.length}
      </Text>

      {/* Menu Items List */}
      <Text style={styles.menuTitle}>Our Menu</Text>
      {menuItems.length > 0 ? (
        <FlatList
          data={menuItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>
                <Text style={styles.boldText}>{item.name}</Text> - {item.course} - R{item.price}
              </Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noItemsText}>No menu items available. Add items to view them here!</Text>
      )}

      <Button
        title="Go to Add Items"
        color="#9c7c38"
        onPress={() => navigation.navigate('Add', { menuItems, setMenuItems })} // Pass params to Add screen
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
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#9c7c38',
    textAlign: 'center',
  },
  averageText: {
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
  },
  totalItems: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    color: '#9c7c38',
    textAlign: 'center',
  },
  itemContainer: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    width: '100%',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  noItemsText: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;







