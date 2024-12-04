import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";

// Mock User Data
const USER_DATA = {
  name: "Subash", // This can be fetched from your user authentication or database
  email: "subash@example.com",
};

// Mock Data for Service Provider
const QUICK_STATS = [
  // ...
];
const RECENT_JOBS = [
  // ...
];
const UPCOMING_BOOKINGS = [
  // ...
];

const ServiceProviderHomeScreen = () => {
  const [notifications, setNotifications] = useState(3);
  const navigation = useNavigation(); // For navigation on tab clicks

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.profileSection}>
          <Image
            source={require("../images/professional2.png")}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.welcomeText}>
              Welcome back, {USER_DATA.name || USER_DATA.email}
            </Text>
            <Text style={styles.subHeaderText}>Service Professional</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationBadge}>
          <Ionicons name="notifications" size={24} color="#FF5722" />
          {notifications > 0 && (
            <View style={styles.notificationCount}>
              <Text style={styles.notificationCountText}>{notifications}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderQuickStats = () => (
    <View style={styles.quickStatsContainer}>
      {QUICK_STATS.map((stat) => (
        <View key={stat.id} style={styles.statCard}>
          <MaterialCommunityIcons
            name={stat.icon}
            size={30}
            color={stat.color}
          />
          <Text style={styles.statValue}>{stat.value}</Text>
          <Text style={styles.statName}>{stat.name}</Text>
        </View>
      ))}
    </View>
  );

  const renderRecentJobs = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Recent Jobs</Text>
      {RECENT_JOBS.map((job) => (
        <View key={job.id} style={styles.jobCard}>
          <View style={styles.jobCardLeft}>
            <Text style={styles.customerName}>{job.customerName}</Text>
            <Text style={styles.serviceType}>{job.serviceType}</Text>
            <Text style={styles.jobDate}>{job.date}</Text>
          </View>
          <View style={styles.jobCardRight}>
            <Text style={styles.jobEarnings}>{job.earnings}</Text>
            <Text style={styles.jobStatus}>{job.status}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderUpcomingBookings = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Upcoming Bookings</Text>
      {UPCOMING_BOOKINGS.map((booking) => (
        <View key={booking.id} style={styles.bookingCard}>
          <View>
            <Text style={styles.customerName}>{booking.customerName}</Text>
            <Text style={styles.serviceType}>{booking.serviceType}</Text>
            <Text style={styles.bookingDetails}>{booking.date}</Text>
            <Text style={styles.bookingLocation}>{booking.location}</Text>
          </View>
          <View style={styles.bookingActions}>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectButton}>
              <Text style={styles.rejectButtonText}>Reject</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
  const renderBottomNavigation = () => (
    <View style={styles.bottomNavigation}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="home" size={24} color="#FF5722" />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Schedule")}
      >
        <MaterialIcons name="calendar-today" size={24} color="#666" />
        <Text style={styles.navText}>Schedule</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Jobs")}
      >
        <MaterialIcons name="work" size={24} color="#666" />
        <Text style={styles.navText}>Jobs</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("ProfileScreen")}
      >
        <Ionicons name="person" size={24} color="#666" />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {renderHeader()}
        {renderQuickStats()}
        {renderRecentJobs()}
        {renderUpcomingBookings()}
      </ScrollView>
      {renderBottomNavigation()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "white",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subHeaderText: {
    color: "#666",
  },
  notificationBadge: {
    position: "relative",
  },
  notificationCount: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#FF5722",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationCountText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  quickStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingVertical: 15,
    marginVertical: 10,
  },
  statCard: {
    alignItems: "center",
    width: "30%",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  statName: {
    color: "#666",
    fontSize: 12,
  },
  sectionContainer: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  jobCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  customerName: {
    fontWeight: "bold",
  },
  serviceType: {
    color: "#666",
  },
  jobDate: {
    color: "#666",
    fontSize: 12,
  },
  jobEarnings: {
    fontWeight: "bold",
    color: "#2ECC71",
  },
  jobStatus: {
    color: "#666",
    fontSize: 12,
  },
  bookingCard: {
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  bookingActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: "#2ECC71",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  rejectButton: {
    backgroundColor: "#E74C3C",
    padding: 10,
    borderRadius: 5,
    width: "48%",
    alignItems: "center",
  },
  acceptButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  rejectButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingVertical: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default ServiceProviderHomeScreen;
