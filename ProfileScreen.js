// ProfileScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Icon name="notifications-outline" size={24} style={styles.notificationIcon} />

      <View style={styles.profileContainer}>
        <View style={styles.profileIcon}>
          <Text style={styles.profileInitial}>J</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Julian</Text>
          <Text style={styles.profileLink}>Muestra el perfil</Text>
        </View>
        <Icon name="chevron-forward" size={24} />
      </View>

      <Text style={styles.sectionTitle}>Configuración</Text>

      <TouchableOpacity style={styles.settingOption} onPress={() => navigation.navigate('PersonalInfo')}>
        <Icon name="person-outline" size={24} />
        <Text style={styles.settingText}>Información personal</Text>
        <Icon name="chevron-forward" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  notificationIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  profileInitial: {
    fontSize: 24,
    color: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileLink: {
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  settingOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ProfileScreen;
