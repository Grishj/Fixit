import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

function ChoiceScreen ({ navigation })  {
  const [modalVisible, setModalVisible] = useState(false);
  const [actionType, setActionType] = useState(''); // 'Sign In' or 'Sign Up'

  const openModal = (type) => {
    setActionType(type);
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Please sign in or sign up to proceed.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => openModal('Sign In')}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => openModal('Sign Up')}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
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
              <Text style={styles.buttonText}>As Service Provider</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                closeModal();
                navigation.navigate(actionType === 'Sign In' ? 'UserSignIn' : 'UserSignUp');
              }}
            >
              <Text style={styles.buttonText}>As User</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  message: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    color: '#212529',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#212529',
  },
  modalButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  closeText: {
    color: '#007bff',
    marginTop: 15,
    fontWeight: '600',
  },
});

export default ChoiceScreen;
