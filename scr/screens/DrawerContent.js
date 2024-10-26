// DrawerContent.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function DrawerContent  ({ navigation })  {
  return (
    <View style={styles.drawerContent}>
      <Text style={styles.drawerTitle}>Sidebar Menu</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text style={styles.drawerItem}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
        <Text style={styles.drawerItem}>Categories</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Booking')}>
        <Text style={styles.drawerItem}>My Bookings</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ServiceProvider')}>
        <Text style={styles.drawerItem}>Service Providers</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.drawerItem}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    padding: 20,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  drawerItem: {
    fontSize: 18,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default DrawerContent;
