import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

function ServiceListScreen ({ navigation })  {
  const [services, setServices] = useState([
    { id: 1, title: 'Cleaning', description: 'Professional house cleaning service' },
    { id: 2, title: 'Lawn Mowing', description: 'Get your lawn mowed by an expert' },
    { id: 3, title: 'Handyman', description: 'Fix that leaky faucet or broken cabinet' },
    { id: 4, title: 'Grocery Delivery', description: 'Get your groceries delivered to your doorstep' },
  ]);

  const handleServicePress = (service) => {
    navigation.navigate('ServiceDetail', { service });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.serviceItem} onPress={() => handleServicePress(item)}>
            <Text style={styles.serviceTitle}>{item.title}</Text>
            <Text style={styles.serviceDescription}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  serviceItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    elevation: 2,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 16,
    color: '#666',
  },
});

export default ServiceListScreen;