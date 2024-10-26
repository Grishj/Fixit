import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
      <Image
  source={require('../images/electricity.jpg')}
  style={[styles.image, styles.profileImage]}
/>
        <Text style={styles.profileName}>Anil Karki</Text>
        <Text style={styles.username}>@karki.anil37</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <Icon name="gear" size={20} color="#000" />
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Icon name="credit-card" size={20} color="#000" />
          <Text style={styles.optionText}>Billings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Icon name="info-circle" size={20} color="#000" />
          <Text style={styles.optionText}>Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Icon name="shield" size={20} color="#000" />
          <Text style={styles.optionText}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Icon name="comments" size={20} color="#000" />
          <Text style={styles.optionText}>FAQ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Icon name="trash" size={20} color="#000" />
          <Text style={styles.optionText}>Delete Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Icon name="sign-out" size={20} color="#000" />
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius:5,
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor:'#ffe4cd',
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop:10,
    
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  username: {
    color: 'gray',
  },
  editButton: {
    backgroundColor: '#ff7f50',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  optionsContainer: {
    marginVertical: 20,
    


  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    marginTop: 4,
    color: 'gray',
  },
});