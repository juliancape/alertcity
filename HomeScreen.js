import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Keyboard } from 'react-native';
import { auth } from './firebase/firebaseConfig';
import { signOut } from "firebase/auth";
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';

const HomeScreen = ({ navigation }) => {
  const [inputText, setInputText] = useState('');
  const [alerts, setAlerts] = useState([
    { id: '1', title: 'Título 1', subtitle: 'Subtítulo', description: 'Descripción' },
    { id: '2', title: 'Título 2', subtitle: 'Subtítulo', description: 'Descripción' },
    // Agrega más alertas aquí según sea necesario
  ]);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    // Detecta cuando el teclado se muestra o se oculta
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardVisible(false)
    );

    // Limpia los listeners cuando el componente se desmonta
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigation.replace('Login'))
      .catch(error => Alert.alert("Error", "No se pudo cerrar sesión. Inténtalo de nuevo más tarde."));
  };

  const handleAdd = () => {
    navigation.navigate('AlertScreen');
  };

  const handleNavigateTo = (screen) => {
    navigation.navigate(screen);
  };

  const renderAlertItem = ({ item }) => (
    <View style={styles.alertCard}>
      <Text style={styles.alertTitle}>{item.title}</Text>
      <Text style={styles.alertSubtitle}>{item.subtitle}</Text>
      <Text style={styles.alertDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{ latitude: 4.6097, longitude: -74.0817, latitudeDelta: 0.1, longitudeDelta: 0.1 }} />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Bogotá, Colombia"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.alertCount}>Se encontraron {alerts.length} alertas</Text>
      <FlatList
        data={alerts}
        renderItem={renderAlertItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.alertList}
      />

      {/* Solo muestra el footer si el teclado no está visible */}
      {!isKeyboardVisible && (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  map: {
    height: '40%', // Ajusta la altura del mapa
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    marginTop: -20,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#E4D1F9',
    borderRadius: 20,
    padding: 10,
  },
  alertCount: {
    fontSize: 16,
    marginVertical: 10,
    marginLeft: 20,
  },
  alertList: {
    paddingHorizontal: 10,
  },
  alertCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  alertSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  alertDescription: {
    fontSize: 12,
    color: '#999',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
  },
});

export default HomeScreen;
