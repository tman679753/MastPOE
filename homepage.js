import React from 'react';
import { ScrollView, Text, Button, Image, StyleSheet } from 'react-native';

function HomeScreen({ route, navigation }) {
  const { menuItems, setMenuItems } = route.params;  // Get menuItems and setMenuItems from route params

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.logo} source={require('./_img/food_logo2.png')} />
      <Text style={styles.title}>
        Welcome to Chritofells Delights. Please view the average price of our courses below
      </Text>

      {/* Calculate and display average prices */}
      {['Starters', 'Mains', 'Desserts'].map((course) => {
        const courseItems = menuItems.filter(item => item.course === course);
        const average = (courseItems.reduce((acc, item) => acc + parseFloat(item.price), 0) / courseItems.length).toFixed(2);
        return (
          <Text key={course} style={styles.averageText}>
            {course}: R{average}
          </Text>
        );
      })}

      <Button
        title="Go to Add Items"
        color="#9c7c38"
        onPress={() => navigation.navigate('Add', { menuItems, setMenuItems })}  // Pass params to Add screen
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

export default HomeScreen;
