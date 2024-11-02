// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity, TextInput } from 'react-native';
import { auth } from './firebase/firebaseConfig';
import { signOut } from "firebase/auth";
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
  const [inputText, setInputText] = useState('');

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => {
        console.error("Error al cerrar sesión:", error);
        Alert.alert("Error", "No se pudo cerrar sesión. Inténtalo de nuevo más tarde.");
      });
  };

  const handleNavigateTo = (screen) => {
    navigation.navigate(screen);
  };

  const handleAdd = () => {
    navigation.navigate('AlertScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu texto aquí"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.continueButton} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.welcomeText}>¡Bienvenido a AlertCity!</Text>
      <Button title="Cerrar sesión" onPress={handleSignOut} />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigateTo('Explora')}>
          <Icon name="search" size={30} />
          <Text style={styles.buttonText}>Explora</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleNavigateTo('ProfileScreen')}>
          <Icon name="person" size={30} />
          <Text style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E4D1F9', // Color de borde morado
    borderRadius: 20, // Bordes más circulares
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
  },
  continueButton: {
    backgroundColor: '#E4D1F9',
    paddingVertical: 6,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
    backgroundColor: '#ffffff',
    elevation: 2,
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    marginTop: 5,
    fontSize: 16,
  },
});

export default HomeScreen;
