import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase/firebaseConfig';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Inicio de sesión exitoso, navega a HomeScreen
        navigation.replace('Home');
      })
      .catch(error => alert(error.message)); // Manejar errores de autenticación
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicia sesión o regístrate</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Botón Iniciar sesión */}
      <TouchableOpacity style={styles.continueButton} onPress={handleLogin}>
        <Text style={styles.continueButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      {/* Resto de los botones */}
      <TouchableOpacity style={styles.emailButton} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.emailButtonText}>Registrarse con un correo electrónico</Text>
      </TouchableOpacity>

      {/* Logo de la aplicación */}
      <Text style={styles.logo}>ALERTCITY</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#333',
  },
  continueButton: {
    backgroundColor: '#E4D1F9',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  continueButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  emailButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  logo: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  emailButtonText: {
    color: '#555',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
