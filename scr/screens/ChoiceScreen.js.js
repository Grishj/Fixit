import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ImageBackground ,Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

function ChoiceScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [actionType, setActionType] = useState(''); // 'Sign In' or 'Sign Up'

  const openModal = (type) => {
    setActionType(type);
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  return (
    <ImageBackground
      source={require('../images/wow.jpg')} // Path to your background image
      style={styles.container}
    >
      <View style={styles.overlay}>
        {/* App Logo */}
        <Image 
          source={require('../images/HomeSolution.jpeg')} // Path to your logo file
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.message}>Welcome to Home Solution!</Text>
        <Text style={styles.subMessage}>Please sign in or sign up to proceed.</Text>
        
        <TouchableOpacity style={styles.button} onPress={() => openModal('Sign In')}>
          <LinearGradient
            colors={['#007bff', '#0056b3']}
            style={styles.gradientButton}
          >
            <Ionicons name="log-in-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => openModal('Sign Up')}>
          <LinearGradient
            colors={['#28a745', '#218838']}
            style={styles.gradientButton}
          >
            <Ionicons name="person-add-outline" size={20} color="#fff" />
            <Text style={styles.buttonText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{actionType}</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  closeModal();
                  navigation.navigate(actionType === 'Sign In' ? 'ProviderSignIn' : 'ProviderSignUp');
                }}
              >
                <Text style={styles.modalButtonText}>As Service Provider</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  closeModal();
                  navigation.navigate(actionType === 'Sign In' ? 'UserSignIn' : 'UserSignUp');
                }}
              >
                <Text style={styles.modalButtonText}>As User</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Ensures content is centered vertically
    alignItems: 'center', // Centers content horizontally
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Add a semi-transparent overlay to ensure readability of the text
    width: '100%',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 60,
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff', // White text to contrast with background
  },
  subMessage: {
    fontSize: 16,
    marginBottom: 30,
    color: '#fff', // White text to contrast with background
    textAlign: 'center',
  },
  button: {
    marginVertical: 10,
    width: '80%',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
  },
  modalButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  closeText: {
    color: '#007bff',
    marginTop: 15,
    fontWeight: '600',
  },
});

export default ChoiceScreen;
