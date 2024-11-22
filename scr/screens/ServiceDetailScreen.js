import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BookingDetailsScreen from './BookingDetailsScreen';
const ServiceDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const params = route.params || {};
  const {
    title = 'Service Details',
    image = null,
    description = 'No description available.',
    providerName = 'Raman',
    charges = 'NRS 100/hour',
    availability = '9AM - 6PM',
  } = params;

  const handleBookNow = () => {
    navigation.navigate('BookingDetailsScreen', { serviceDetails: params });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={image || require('../images/AC.jpeg')} style={styles.serviceImage} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.detailSection}>
        <Text style={styles.detailLabel}>Provider Name:</Text>
        <Text style={styles.detailValue}>{providerName}</Text>
      </View>
      <View style={styles.detailSection}>
        <Text style={styles.detailLabel}>Charges:</Text>
        <Text style={styles.detailValue}>{charges}</Text>
      </View>
      <View style={styles.detailSection}>
        <Text style={styles.detailLabel}>Availability:</Text>
        <Text style={styles.detailValue}>{availability}</Text>
      </View>

      <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  serviceImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 20,
  },
  detailSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  detailValue: {
    fontSize: 16,
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ServiceDetailScreen;
