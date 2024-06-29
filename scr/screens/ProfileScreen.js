import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({ navigation }) => {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [activityNotifications, setActivityNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [touchID, setTouchID] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity style={styles.profilePicture}>
          <Image source={require('../images/Image.jpg')} style={styles.profileImage} />
          <Icon name="camera" size={20} color="#fff" style={styles.cameraIcon} />
        </TouchableOpacity>
        <View style={styles.userInfo}>
          <Text style={styles.name}>HomeSolution</Text>
          <Text style={styles.phone}>976554321</Text>
        </View>

      </View>
      <View style={styles.section}>
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('AccountDetails')}>
          <Icon name="person" size={24} color="#756e80" />
          <Text style={styles.rowText}>Account details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Documents')}>
          <Icon name="insert-drive-file" size={24} color="#756e80" />
          <Text style={styles.rowText}>Documents</Text>
        </TouchableOpacity>
        <View style={styles.row}>
          <Icon name="location-on" size={24} color="#756e80" />
          <Text style={styles.rowText}>Turn your location</Text>
          <Switch
            value={locationEnabled}
            onValueChange={setLocationEnabled}
          />
        </View>
      </View>
      <View style={styles.section}>
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('BankAccount')}>
          <Icon name="account-balance" size={24} color="#756e80" />
          <Text style={styles.rowText}>Bank Account</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <View style={styles.row}>
          <Icon name="notifications" size={24} color="#756e80" />
          <Text style={styles.rowText}>Activities notifications</Text>
          <Switch
            value={activityNotifications}
            onValueChange={setActivityNotifications}
          />
        </View>
        <View style={styles.row}>
          <Icon name="email" size={24} color="#756e80" />
          <Text style={styles.rowText}>Email notification</Text>
          <Switch
            value={emailNotifications}
            onValueChange={setEmailNotifications}
          />
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.row}>
          <Icon name="fingerprint" size={24} color="#756e80" />
          <Text style={styles.rowText}>Sign in with touch ID</Text>
          <Switch
            value={touchID}
            onValueChange={setTouchID}
          />
        </View>
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('ChangePassword')}>
          <Icon name="lock" size={24} color="#756e80" />
          <Text style={styles.rowText}>Change password</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('SignInScreen')}>
          <Icon name="logout" size={24} color="#756e80" />
          <Text style={styles.rowText}>LogOut</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical:28,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'grey',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    color: '#fff',
  },
  phone: {
    marginTop: 10,
    fontSize: 18,
    color: '#fff',
  },
  section: {
    marginVertical: 1,
  },
  userInfo: {
    marginLeft: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 4,

    borderBottomColor: '#eee',
  },
  rowText: {
    flex: 1,
    marginLeft: 10,
    
    fontSize: 16,
  },
});

export default ProfileScreen;
