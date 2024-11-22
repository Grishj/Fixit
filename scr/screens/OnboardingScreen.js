import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const OnboardingScreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const navigation = useNavigation();
  const flatListRef = useRef();

  const slides = [
    {
      id: 1,
      title: 'Welcome to HomeSolution',
      description: 'Service at home like never experienced before.',
      image: require('../images/HomeSolution.jpeg'),
      backgroundColor: '#f2f2f2', // Tomato Red
    },
    {
      id: 2,
      title: 'Browse and Book',
      description: 'Browse through various categories and book services.',
      image: require('../images/Onboard.jpg'),
      backgroundColor: '#faebd7',
    },
    {
      id: 3,
      title: 'Get Things Done',
      description: 'Sit back and relax while Taskers get your tasks done.',
      image: require('../images/onboard3.jpeg'),
      backgroundColor: '#fcfcfc', // Lime Green
    },
  ];

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(index);
  };

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      const nextIndex = currentSlideIndex + 1;
      setCurrentSlideIndex(nextIndex);
      flatListRef.current.scrollToIndex({ index: nextIndex });
    } else {
      navigation.navigate('AppNavigator');
    }
  };

  const skipOnboarding = () => {
    navigation.navigate('AppNavigator');
  };

  const renderSlide = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: slides[currentSlideIndex]?.backgroundColor || '#fff' },
      ]}
    >
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={updateCurrentSlideIndex}
      />

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentSlideIndex === index && { backgroundColor: '#007BFF', width: 20 },
            ]}
          />
        ))}
      </View>

      {/* Skip and Next/Start buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={skipOnboarding} style={styles.nextButton}>
          <Text style={styles.nextText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={nextSlide} style={styles.nextButton}>
          <Text style={styles.nextText}>
            {currentSlideIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    width: width,
    alignItems: 'center',
    padding: 5,
  },
  image: {
    width: '100%',
    height: '60%',
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#626262',
    marginBottom: 40,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: '#bbb',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor:'#626262',// skip rw next ko backgroundcolor
        paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default OnboardingScreen;
