import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Keyboard, Alert } from 'react-native';
import { db, auth } from './firebase/firebaseConfig'; // Firebase para base de datos y autenticacion
const { collection, getDocs } = require("firebase/firestore");
import { signOut } from "firebase/auth"; // Para cerrar sesion
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';

const HomeScreen = ({ navigation }) => {
  const [inputText, setInputText] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  // Obtiene las alertas desde Firestore al cargar el componente
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'alerts'));
        const alertsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAlerts(alertsData); // Actualiza el estado con las alertas
      } catch (error) {}
    };
    fetchAlerts();
  }, []);

  // Detecta cuando el teclado se muestra u oculta
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

  // Cierra sesion y redirige a la pantalla de inicio de sesion
  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigation.replace('Login'))
      .catch(error => Alert.alert("Error", "No se pudo cerrar sesión. Inténtalo de nuevo más tarde."));
  };

  // Navega a la pantalla para crear una nueva alerta
  const handleAdd = () => {
    navigation.navigate('AlertScreen');
  };

  // Navega a pantallas adicionales como "Explora" o "Perfil"
  const handleNavigateTo = (screen) => {
    navigation.navigate(screen, { alerts });
  };

  return (
    <View style={styles.container}>
      {/* Mapa que muestra las ubicaciones de las alertas */}
      <MapView 
        style={styles.map} 
        initialRegion={{
          latitude: 4.6097,
          longitude: -74.0817,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {/* Muestra marcadores de las alertas */}
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
              description={`Descripción: ${alert.description}`}
            />
          )
        ))}
      </MapView>

      {/* Input para buscar y boton para agregar nuevas alertas */}
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

      {/* Lista de alertas */}
      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.alertContainer}>
            <Text style={styles.alertTitle}>{item.title}</Text>
            <Text style={styles.alertText}>Descripción: {item.description}</Text>
          </View>
        )}
      />

      {/* Footer con opciones de navegacion */}
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
