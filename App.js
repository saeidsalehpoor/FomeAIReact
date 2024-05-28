/*
import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

//const API_URL = "http://localhost:3001"; 
const API_URL = "http://192.168.1.102:3001"; 

export default function App() {
  function update() {
    const data = {
      City: 'Shanghai',
      CountryCode: 'CHN',
      Pop: '444444'
    };

    axios.post(`${API_URL}/api/update`, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => {
      console.log(response.data);
      Alert.alert('Success', `Update successful: ${response.data.message}`);
    })
    .catch((error) => {
      console.error(error);
      Alert.alert('Error', 'Failed to update population');
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The DB Upload Example</Text>
      <Button title="Update" onPress={update} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
*/
import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './AppNavigator'; 

const API_URL = "http://192.168.1.102:3001"; 

const App = () => {
  
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppNavigator /> 
    </>
  );
};

export default App;
