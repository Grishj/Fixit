import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, CheckBox, ActivityIndicator } from 'react-native';

function ProviderSignUp ()  {
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [document, setDocument] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDocumentUpload = async () => {
    try {
      const result = await DocumentPicker.pickSingle({ type: [DocumentPicker.types.allFiles] });
      setDocument(result);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) alert('Error uploading document');
    }
  };

  const handleSignUp = () => {
    if (!businessName || !email || !password || !acceptedTerms) {
      alert('Please fill all fields and accept the terms');
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Sign-up successful!');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Provider Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Business Name"
        value={businessName}
        onChangeText={setBusinessName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.uploadButton} onPress={handleDocumentUpload}>
        <Text style={styles.uploadText}>
          {document ? `Uploaded: ${document.name}` : 'Upload Business Document'}
        </Text>
      </TouchableOpacity>
      <View style={styles.checkboxContainer}>
        <CheckBox value={acceptedTerms} onValueChange={setAcceptedTerms} />
        <Text style={styles.checkboxText}>I accept the terms of service</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        {isLoading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Sign Up</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  uploadButton: {
    backgroundColor: '#6C757D',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  uploadText: {
    color: '#FFF',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default ProviderSignUp;
