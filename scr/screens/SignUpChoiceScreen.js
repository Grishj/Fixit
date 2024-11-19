import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const SignUpChoiceScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { service } = route.params; // Get selected service

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Access {service.name}</Text>
      <Text style={styles.subtitle}>Please sign in or sign up to proceed</Text>

      <TouchableOpacity
        style={[styles.button, styles.userButton]}
        onPress={() => navigation.navigate("UserSignIn")}
      >
        <Text style={styles.buttonText}>Sign in as User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.providerButton]}
        onPress={() => navigation.navigate("ProviderSignIn")}
      >
        <Text style={styles.buttonText}>Sign in as Service Provider</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C757D',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  userButton: {
    backgroundColor: '#007BFF',
  },
  providerButton: {
    backgroundColor: '#FF5722',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SignUpChoiceScreen;
