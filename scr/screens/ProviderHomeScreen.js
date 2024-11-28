import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Button,
  RefreshControl,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as IntentLauncher from "expo-intent-launcher";

function ServiceProviderHomeScreen ({ navigation })  {
  const [location, setLocation] = useState("");
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [isFavoriteVisible, setFavoriteVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPopularServices, setFilteredPopularServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh

  // Function to simulate data refresh
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setFilteredPopularServices([...popularServices]); // Refresh popular services
      setFilteredServices([...services]); // Refresh other services
      setRefreshing(false);
    }, 2000); // Simulate a 2-second network request
  };

  useEffect(() => {
    const searchTerm = searchQuery.toLowerCase();

    // Filter both Popular and Our Services based on the search query
    setFilteredPopularServices(
      popularServices.filter((service) =>
        service.name.toLowerCase().includes(searchTerm)
      )
    );

    setFilteredServices(
      services.filter((service) =>
        service.name.toLowerCase().includes(searchTerm)
      )
    );
  }, [searchQuery]);

  const openGoogleMaps = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = userLocation.coords;
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

      IntentLauncher.startActivityAsync(IntentLauncher.ACTION_VIEW, {
        data: url,
      });
    } catch (error) {
      console.error("Error opening Google Maps:", error);
      alert("Error opening Google Maps. Please try again.");
    }
  };

  const handleSearch = () => {
    const exactMatchPopularService = filteredPopularServices.find(
      (service) => service.name.toLowerCase() === searchQuery.toLowerCase()
    );

    const exactMatchService = filteredServices.find(
      (service) => service.name.toLowerCase() === searchQuery.toLowerCase()
    );

    // Navigate to the exact match if found
    if (exactMatchPopularService) {
      navigation.navigate("ServiceDetailScreen", { service: exactMatchPopularService });
    } else if (exactMatchService) {
      navigation.navigate("ServiceDetailScreen", { service: exactMatchService });
    } else {
      alert("Service not found. Please refine your search.");
    }
  };

  const handleServiceClick = (service) => {
    const isNewUser = true; // Replace with actual logic to check if the user is new

    if (isNewUser) {
      navigation.navigate("SignUpChoiceScreen");
    } else {
      navigation.navigate("ServiceDetailScreen", { service });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#3B3B3B"]} // Customize the spinner color
              tintColor="#3B3B3B" // For iOS
            />
          }
        >
          {/* Header, Search Location, and Search for Service View */}
          <View style={styles.headerSearchContainer}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>HomeSolution</Text>
              <View style={styles.headerIcons}>
                {/* Notification Icon */}
                <TouchableOpacity
                  onPress={() => setNotificationVisible(true)}
                  accessibilityLabel="Open Notifications"
                >
                  <Ionicons
                    name="notifications"
                    size={24}
                    color="#000"
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>

                {/* Favorite Icon */}
                <TouchableOpacity
                  onPress={() => setFavoriteVisible(true)}
                  accessibilityLabel="Open Favorites"
                >
                  <Ionicons name="heart" size={24} color="#000" style={{ marginRight: 5 }} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Search Location */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Set your location"
                value={location}
                onChangeText={setLocation}
              />
              <TouchableOpacity onPress={openGoogleMaps} style={styles.searchButton}>
                <Ionicons name="location-sharp" size={20} color="white" />
              </TouchableOpacity>
            </View>

            {/* Search for Service */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search for Service"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                <FontAwesome5 name="search" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Services Section View */}
          <View style={styles.servicesContainer}>
            <Text style={styles.sectionTitle}>Popular Services</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
              {filteredPopularServices.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.categoryItem}
                  onPress={() => navigation.navigate("ServiceDetailScreen", { service: category })}
                >
                  <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                    <FontAwesome5 name={category.icon} size={24} color="white" />
                  </View>
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Our Services Section */}
            <Text style={styles.sectionTitle}>Our Services</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filteredServices.map((service, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.serviceItem}
                  onPress={() => handleServiceClick(service)}
                >
                  <Image source={service.image} style={styles.serviceImage} />
                  <Text style={styles.serviceText}>{service.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Our Services Section 2 */}
            <Text style={styles.sectionTitle}>Our Services 2</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filteredServices.map((service, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.serviceItem}
                  onPress={() => handleServiceClick(service)}
                >
                  <Image source={service.image} style={styles.serviceImage} />
                  <Text style={styles.serviceText}>{service.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Notification Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isNotificationVisible}
            onRequestClose={() => setNotificationVisible(false)}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Notifications</Text>
              <Text>No new notifications at the moment.</Text>
              <Button title="Close" onPress={() => setNotificationVisible(false)} />
            </View>
          </Modal>

          {/* Favorite Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isFavoriteVisible}
            onRequestClose={() => setFavoriteVisible(false)}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Favorites</Text>
              <Text>No favorite items added yet!</Text>
              <Button title="Close" onPress={() => setFavoriteVisible(false)} />
            </View>
          </Modal>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const popularServices = [
  { name: "AC Repair", icon: "tools", color: "#FF6584" },
  { name: "Painting", icon: "paint-brush", color: "#7F63D3" },
  { name: "Electronics", icon: "tv", color: "#00C4B4" },
  { name: "Plumbing", icon: "wrench", color: "#FFA62B" },
  { name: "Appliances", icon: "plug", color: "#82D173" },
];

const services = [
  { name: "Cleaning", image: require("../images/cleaning.png") },
  { name: "Maintenance", image: require("../images/maintenance.jpg") },
  { name: "Security", image: require("../images/security.jpeg") },
];

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  container: {
    flex: 1,
    padding: 15,
  },
  scrollView: {
    flex: 1,
  },
  headerSearchContainer: {
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginRight: 10,
  },
  searchButton: {
    padding: 10,
    backgroundColor: "#3B3B3B",
    borderRadius: 8,
  },
  servicesContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 20,
  },
  categoryIcon: {
    padding: 15,
    borderRadius: 30,
  },
  categoryText: {
    marginTop: 5,
    textAlign: "center",
    fontSize: 14,
  },
  serviceItem: {
    marginRight: 20,
    alignItems: "center",
  },
  serviceImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  serviceText: {
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
});

export default ServiceProviderHomeScreen;

