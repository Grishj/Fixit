import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TaskListScreen = () => {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', details: 'Details of Task 1', location: 'Location 1', payment: 100, serviceTime: '2 hours', status: 'Pending' },
    { id: 2, name: 'Task 2', details: 'Details of Task 2', location: 'Location 2', payment: 150, serviceTime: '3 hours', status: 'Pending' },
    { id: 3, name: 'Task 3', details: 'Details of Task 3', location: 'Location 3', payment: 200, serviceTime: '1 hour', status: 'Pending' },
  ]);
  const [refreshing, setRefreshing] = useState(false);

  // Function to handle task acceptance
  const acceptTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: 'Accepted' } : task
    );
    setTasks(updatedTasks);
    sendNotification('accepted', taskId);
  };

  // Function to handle task rejection
  const rejectTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: 'Rejected' } : task
    );
    setTasks(updatedTasks);
    sendNotification('rejected', taskId);
  };

  // Function to trigger a notification
  const sendNotification = (action, taskId) => {
    const task = tasks.find(t => t.id === taskId);
    const message = `Task "${task.name}" has been ${action}`;
    Alert.alert('Task Status Update', message);
  };

  // Function to handle refresh action
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate fetching new tasks or updating task statuses
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('Task List Refreshed');
    }, 1000);
  }, []);

  // Render the task item
  const renderTaskItem = ({ item }) => (
    <View style={styles.taskCard}>
      <Text style={styles.taskName}>{item.name}</Text>
      <Text style={styles.taskDetails}>{item.details}</Text>
      <Text style={styles.taskLocation}>{item.location}</Text>
      <Text style={styles.taskPayment}>Payment: Rs{item.payment}</Text>
      <Text style={styles.taskServiceTime}>Service Time: {item.serviceTime}</Text>
      <Text style={styles.taskStatus}>Status: {item.status}</Text>
      
      {item.status === 'Pending' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'green' }]}
            onPress={() => acceptTask(item.id)}
          >
            <Icon name="checkmark-circle" size={24} color="white" />
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'red' }]}
            onPress={() => rejectTask(item.id)}
          >
            <Icon name="close-circle" size={24} color="white" />
            <Text style={styles.buttonText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTaskItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,

  },
  taskCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  taskName: {
    fontSize: 18,
    fontWeight: '600',
  },
  taskDetails: {
    fontSize: 14,
    color: 'gray',
    marginVertical: 5,
  },
  taskLocation: {
    fontSize: 14,
    marginVertical: 5,
  },
  taskPayment: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  taskServiceTime: {
    fontSize: 14,
    marginVertical: 5,
  },
  taskStatus: {
    fontSize: 14,
    marginVertical: 5,
    fontWeight: 'bold',
    color: item => (item.status === 'Pending' ? 'orange' : item.status === 'Accepted' ? 'green' : 'red'),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    width: '45%',
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
  },
});

export default TaskListScreen;
