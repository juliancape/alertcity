import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';
import { db } from './firebase/firebaseConfig'; 
import { collection, addDoc } from 'firebase/firestore';

const AlertScreen = ({ navigation }) => {
  const [alertType, setAlertType] = useState('Robo');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 4.6097,
    longitude: -74.0817,
  });

  const handleSelectLocation = (coordinate) => {
    setSelectedLocation(coordinate);
    setLocation(`Lat: ${coordinate.latitude.toFixed(4)}, Lng: ${coordinate.longitude.toFixed(4)}`);
    setShowMap(false);
  };

  const handleSetDate = () => {
    const currentDate = new Date();
    setDate(currentDate.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }));
  };

  const saveAlert = async () => {
    if (!title || !location || !date) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios.');
      return;
    }

    try {
      await addDoc(collection(db, 'alerts'), {
        alertType,
        title,
        subtitle,
        description,
        location,
        date,
        selectedLocation: {
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
        },
      });
      Alert.alert('Éxito', 'Alerta guardada correctamente.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la alerta. Intenta de nuevo.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={24} />
      </TouchableOpacity>
      <Text style={styles.header}>Publicar una alerta</Text>

      <TextInput
        style={styles.input}
        placeholder="Tipo de Alerta"
        value={alertType}
        onChangeText={setAlertType}
      />
      <TextInput
        style={styles.input}
        placeholder="Título..."
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Subtítulo..."
        value={subtitle}
        onChangeText={setSubtitle}
      />
      <TextInput
        style={[styles.input, styles.description]}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <View style={styles.locationContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ubicación"
          value={location}
          onChangeText={setLocation}
        />
        <TouchableOpacity style={styles.iconButton} onPress={() => setShowMap(true)}>
          <Icon name="location" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.locationContainer}>
        <TextInput
          style={styles.input}
          placeholder="Fecha"
          value={date}
          onChangeText={setDate}
        />
        <TouchableOpacity style={styles.iconButton} onPress={handleSetDate}>
          <Icon name="calendar" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Modal para seleccionar ubicación en el mapa */}
      <Modal visible={showMap} animationType="slide">
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          onPress={(e) => handleSelectLocation(e.nativeEvent.coordinate)}
        >
          <Marker coordinate={selectedLocation} />
        </MapView>
        <TouchableOpacity style={styles.closeButton} onPress={() => setShowMap(false)}>
          <Text style={styles.closeButtonText}>Cerrar</Text>
        </TouchableOpacity>
      </Modal>

      <TouchableOpacity style={styles.saveButton} onPress={saveAlert}>
        <Text style={styles.saveButtonText}>Guardar Alerta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E4D1F9',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    flex: 1,
  },
  description: {
    height: 80,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 5,
    padding: 10,
    backgroundColor: '#E4D1F9',
    borderRadius: 5,
  },
  map: {
    flex: 1,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#E4D1F9',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#E4D1F9',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  saveButtonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default AlertScreen;
