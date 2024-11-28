import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const ExploreScreen = ({ route }) => {
  const { alerts } = route.params;

  const renderAlertItem = ({ item }) => (
    <View style={styles.alertCard}>
      <Text style={styles.alertTitle}>{item.title}</Text>
      <Text style={styles.alertDescription}>Descripción: {item.description}</Text>
      <Text style={styles.alertLocation}>
        Ubicación: {item.selectedLocation ? `${item.selectedLocation.latitude}, ${item.selectedLocation.longitude}` : 'No especificada'}
      </Text>
      <Text style={styles.alertDate}>Fecha: {item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={alerts}
        renderItem={renderAlertItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.alertList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  alertList: { padding: 10 },
  alertCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginVertical: 5, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 3 },
  alertTitle: { fontSize: 16, fontWeight: 'bold' },
  alertSubtitle: { fontSize: 14, color: '#666' },
  alertDescription: { fontSize: 12, color: '#999' },
  alertLocation: { fontSize: 12, color: '#333' },
  alertDate: { fontSize: 12, color: '#777' },
});

export default ExploreScreen;
