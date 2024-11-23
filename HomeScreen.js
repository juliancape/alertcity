import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Keyboard, Alert } from 'react-native';
import { db, auth } from './firebase/firebaseConfig';
const { collection, getDocs } = require("firebase/firestore");
import { signOut } from "firebase/auth";
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';

const HomeScreen = ({ navigation }) => {
  const [inputText, setInputText] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'alerts'));
        const alertsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAlerts(alertsData);
      } catch (error) {}
    };
    fetchAlerts();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardVisible(false)
    );

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
    navigation.navigate(screen, { alerts });
  };

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        initialRegion={{
          latitude: 4.6097,
          longitude: -74.0817,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {alerts.map(alert => (
          alert.selectedLocation &&
          typeof alert.selectedLocation.latitude === 'number' &&
          typeof alert.selectedLocation.longitude === 'number' && (
            <Marker
              key={alert.id}
              coordinate={{
                latitude: alert.selectedLocation.latitude,
                longitude: alert.selectedLocation.longitude,
              }}
              title={alert.title}
              description={`Categoría: ${alert.category}\nDescripción: ${alert.description}`}
            />
          )
        ))}
      </MapView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por ubicación"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.alertContainer}>
            <Text style={styles.alertTitle}>{item.title}</Text>
            <Text style={styles.alertText}>Categoría: {item.category}</Text>
            <Text style={styles.alertText}>Descripción: {item.description}</Text>
          </View>
        )}
      />

      {!isKeyboardVisible && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={() => handleNavigateTo('ExploreScreen')}>
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
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  map: { height: '40%' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, marginHorizontal: 10, marginTop: -20, backgroundColor: '#fff', borderRadius: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 3 },
  input: { flex: 1, paddingHorizontal: 10 },
  addButton: { backgroundColor: '#E4D1F9', borderRadius: 20, padding: 10 },
  alertContainer: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  alertTitle: { fontWeight: 'bold', fontSize: 16 },
  alertText: { fontSize: 14, color: '#555' },
  footer: { position: 'absolute', bottom: 0, flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingVertical: 10, backgroundColor: '#ffffff', borderTopWidth: 1, borderColor: '#e0e0e0' },
  button: { alignItems: 'center' },
  buttonText: { fontSize: 14 },
});

export default HomeScreen;
