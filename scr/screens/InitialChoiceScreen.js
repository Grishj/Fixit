import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const InitialChoiceScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require('../images/cleaning.png')} style={styles.logo} />
      <Text style={styles.tagline}>Your trusted home service platform</Text>

      <CustomButton
        text="User Login"
        icon="person"
        color="#007BFF"
        onPress={() => navigation.navigate('UserSignIn')}
      />

      <CustomButton
        text="Service Provider Login"
        icon="briefcase"
        color="#FF5722"
        onPress={() => navigation.navigate('ProviderSignIn')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  tagline: {
    fontSize: 18,
    color: '#6C757D',
    marginBottom: 40,
  },
});

export default InitialChoiceScreen;
