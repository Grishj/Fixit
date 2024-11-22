import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

function BookingDetailsScreen ({ route })  {
  const { serviceDetails } = route.params || {};
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');

  const validatePhoneNumber = () => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
    return phoneRegex.test(phoneNumber);
  };

  const handleConfirmBooking = () => {
    if (!validatePhoneNumber()) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number in E.164 format.');
      return;
    }

    if (!location.trim()) {
      Alert.alert('Location Required', 'Please provide your location.');
      return;
    }

    Alert.alert('Booking Confirmed', 'Your booking has been confirmed.');
    // Add async operations like API call if needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Details</Text>
      <Text style={styles.serviceTitle}>{serviceDetails?.title}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Location"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmBooking}>
        <Text style={styles.confirmButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  serviceTitle: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BookingDetailsScreen;
