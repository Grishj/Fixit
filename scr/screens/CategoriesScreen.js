import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

// Sample data for services
const services = [
  {
    id: '1',
    title: 'Cleaning Service',
    description: 'High-quality cleaning service for homes and offices.',
    image: require('../images/cleaning.png'), // Replace with actual image path
  },
  {
    id: '2',
    title: 'Plumbing Service',
    description: 'Professional plumbing service for all your needs.',
    image: require('../images/plumber.jpg'), // Replace with actual image path
  },
  {
    id: '3',
    title: 'Electrical Service',
    description: 'Expert electrical solutions for safe and reliable power.',
    image: require('../images/electricity.jpg'), // Replace with actual image path
  },
  {
    id: '4',
    title: 'Gardening Service',
    description: 'Beautiful garden maintenance by professionals.',
    image: require('../images/pest.jpg'), // Replace with actual image path
  },
  // Add more services as needed
];

const ServiceDetails = ({ navigation }) => {
  // Render each service card
  const renderService = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ServiceDetailScreen', { serviceId: item.id })}
    >
      <Image source={item.image} style={styles.serviceImage} />
      <View style={styles.textContainer}>
        <Text style={styles.serviceTitle}>{item.title}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Our Services</Text>
      <FlatList
        data={services}
        renderItem={renderService}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#ffe4cd',
    paddingHorizontal: 15,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  serviceImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default ServiceDetails;
