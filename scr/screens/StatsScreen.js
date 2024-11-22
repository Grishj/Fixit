import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function StatsScreen() {
  // Sample task data, including earnings and ratings
  const tasks = [
    { id: 1, title: 'Task 1', amount: 100, rating: 4.5 },
    { id: 2, title: 'Task 2', amount: 200, rating: 4.0 },
    { id: 3, title: 'Task 3', amount: 150, rating: 4.8 },
    { id: 4, title: 'Task 4', amount: 120, rating: 3.9 },
    { id: 5, title: 'Task 5', amount: 180, rating: 4.7 },
  ];

  // State to manage the modal visibility
  const [showTaskDetails, setShowTaskDetails] = useState(false);

  // Function to handle showing and hiding the task details modal
  const handleTaskCompletedClick = () => {
    setShowTaskDetails(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowTaskDetails(false);
  };

  // Calculate total earnings
  const calculateTotalEarnings = () => {
    return tasks.reduce((total, task) => total + task.amount, 0);
  };

  // Calculate total number of tasks completed
  const calculateTasksCompleted = () => {
    return tasks.length;
  };

  // Calculate average rating
  const calculateAverageRating = () => {
    const totalRating = tasks.reduce((total, task) => total + task.rating, 0);
    return (totalRating / tasks.length).toFixed(1); // Rounded to 1 decimal place
  };

  // Function to render rating stars with number
  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - Math.ceil(rating);

    const stars = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Icon key={`full-${i}`} name="star" size={20} color="#FFD700" />);
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<Icon key="half" name="star-half" size={20} color="#FFD700" />);
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Icon key={`empty-${i}`} name="star-outline" size={20} color="#FFD700" />);
    }

    return (
      <View style={styles.ratingContainer}>
        {stars}
        <Text style={styles.ratingNumber}>{` ${rating}/5`}</Text>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require('../images/wow.jpg')} // Optional: Add background image
      style={styles.container}
    >
      <Text style={styles.title}>Service Provider Stats</Text>

      <TouchableOpacity style={styles.statCard} onPress={handleTaskCompletedClick}>
        <View style={styles.statItem}>
          <Icon name="checkmark-circle" size={24} color="#4CAF50" />
          <View style={styles.statTextContainer}>
            <Text style={styles.statTitle}>Tasks Completed:</Text>
            <Text style={styles.statValue}>{calculateTasksCompleted()}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.statCard}>
        <View style={styles.statItem}>
          <Icon name="cash" size={24} color="#FF9800" />
          <View style={styles.statTextContainer}>
            <Text style={styles.statTitle}>Earnings:</Text>
            <Text style={styles.statValue}>{`Nrs${calculateTotalEarnings()}`}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.statCard}>
        <View style={styles.statItem}>
          <Icon name="star" size={24} color="#FFD700" />
          <View style={styles.statTextContainer}>
            <Text style={styles.statTitle}>Rating:</Text>
            {renderRatingStars(calculateAverageRating())}
          </View>
        </View>
      </TouchableOpacity>

      {/* Modal to show tasks and earnings */}
      <Modal
        visible={showTaskDetails}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Completed Tasks</Text>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.taskItem}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskAmount}>{`Earnings: Nrs ${item.amount}`}</Text>
                <Text style={styles.taskRating}>
                  Rating: {renderRatingStars(item.rating)}
                </Text>
              </View>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // semi-transparent white card
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statTextContainer: {
    marginLeft: 15,
  },
  statTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  taskItem: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  taskAmount: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  taskRating: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
    fontStyle: 'italic',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingNumber: {
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default StatsScreen;
