import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    if (!email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        navigation.navigate('HomeScreen'); // Adjust to the correct screen after sign-in
      } else {
        const error = await response.json();
        Alert.alert('Sign-in Error', error.message);
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      Alert.alert('Sign-in Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
    <Text style={{ fontSize: 24, fontWeight: 'bold', justifyContent: 'left',paddingVertical:15 }}>Welcome Back</Text>
    
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.passwordIcon}
        >
          <Image
            source={showPassword ? require('../images/eye-open.png') : require('../images/eye-close.png')}
            style={styles.passwordIconImage}
          />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
       
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Text style={{ color: '#000', fontSize: 16 }}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('AppNavigator')}>
          <Text style={styles.link}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    width: '100%',
    position: 'relative',
    marginBottom: 16,
  },
  passwordInput: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  passwordIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  passwordIconImage: {
    width: 24,
    height: 24,
  },
  forgotPasswordLink: {
    color: '#007aff',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007aff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#007aff',
    fontSize: 16,
    marginTop: 0,
  },
});

export default SignInScreen;
