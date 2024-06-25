import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const navigation = useNavigation();

  const slides = [
    {
      id: 1,
      title: 'Welcome to HomeSolution',
      description: 'Find trusted help for your everyday tasks.',
      image: require('../images/HomeSolution.jpeg'), 
    },
    {
      id: 2,
      title: 'Browse and Book',
      description: 'Browse through various categories and book services.',
      image: require('../images/Onboard.jpg'), 
    },
    {
      id: 3,
      title: 'Get Things Done',
      description: 'Sit back and relax while Taskers get your tasks done.',
      image: require('../images/onboard3.jpeg'), 
    },
  ];

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    } else {
      navigation.navigate('SignInScreen');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={slides[currentSlideIndex].image} style={styles.image} />
      <Text style={styles.title}>{slides[currentSlideIndex].title}</Text>
      <Text style={styles.description}>{slides[currentSlideIndex].description}</Text>
      <TouchableOpacity onPress={nextSlide} style={styles.button}>
        <Text style={styles.buttonText}>
          {currentSlideIndex === slides.length - 1 ? 'Get Started' : 'Skip'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '110%',
    height: '50%',
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default OnboardingScreen;
