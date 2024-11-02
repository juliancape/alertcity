// AlertScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AlertScreen = ({ navigation }) => {
  const [alertType, setAlertType] = useState('Robo');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

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
        <TouchableOpacity style={styles.iconButton}>
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
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="calendar" size={24} color="#000" />
        </TouchableOpacity>
      </View>
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
});

export default AlertScreen;
