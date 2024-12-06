import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotFound = () => {
  const navigation = useNavigation();

  // Navigate to the home or main screen when the button is pressed
  const goHome = () => {
    navigation.navigate('/'); // Replace 'Home' with your main screen's name
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>404 - Page Not Found</Text>
      <Text style={styles.message}>Oops! The page you are looking for does not exist.</Text>
      <Button title="Go Back Home" onPress={goHome} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#f44336',
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default NotFound;
