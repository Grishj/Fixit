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
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as IntentLauncher from "expo-intent-launcher";
import CategoriesScreen from "./CategoriesScreen";
import ServiceDetails from "./ServiceDetailScreen";
import ServiceDetailScreen from "./ServiceDetailScreen";

const HomePage = ({ navigation }) => {
  const [location, setLocation] = useState("");
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [isFavoriteVisible, setFavoriteVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPopularServices, setFilteredPopularServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);

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
      navigation.navigate("ServiceDetails", { service: exactMatchPopularService });
    } else if (exactMatchService) {
      navigation.navigate("ServiceDetails", { service: exactMatchService });
    } else {
      alert("Service not found. Please refine your search.");
    }
  };

  const handleServiceClick = (service) => {
    const isNewUser = true; // Replace with actual logic to check if the user is new

    if (isNewUser) {
      navigation.navigate("SignUpChoiceScreen");
    } else {
      navigation.navigate("ServiceDetails", { service });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {/* Header, Search Location, and Search for Service View */}
          <View style={styles.headerSearchContainer}>
            {/* Header */}
            <View style={styles.header}>
              
              <Text style={styles.title}>HomeSolution</Text>
              <View style={styles.headerIcons}>
                {/* Notification Icon */}
                <TouchableOpacity onPress={() => setNotificationVisible(true)}>
                  <Ionicons
                    name="notifications"
                    size={24}
                    color="#000"
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>

                {/* Favorite Icon */}
                <TouchableOpacity onPress={() => setFavoriteVisible(true)}>
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
                  onPress={() => navigation.navigate("ServiceDetailScreen", { ServiceDetailScreen })}
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
                  onPress={() => navigation.navigate("ServiceDetailScreen", { service })}
                >
                  <Image source={service.image} style={styles.serviceImage} />
                  <Text style={styles.serviceText}>{service.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
             {/* Our Services Section */}
             <Text style={styles.sectionTitle}>Our Services2</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filteredServices.map((service, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.serviceItem}
                  onPress={() => navigation.navigate("ServiceDetailScreen", { service })}
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
  { name: "Home Improvement", image: require("../images/HomeImprovement.jpg") },
];

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    marginTop:30,
   
  },
  container: {
    flex: 1,
    
    
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  headerSearchContainer: {
    marginBottom: 16,
  
    borderRadius:15,

  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    
   
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3B3B3B",
    paddingHorizontal:50,
   
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    
    
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
  },
  searchButton: {
    backgroundColor: "#3B3B3B",
    padding: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  servicesContainer: {
    padding: 16,
    borderTopLeftRadius: 20,  // Rounded top left corner
    borderTopRightRadius: 20,
    backgroundColor:'#ffe4cd',
    marginBottom: 20,
    
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3B3B3B",
    marginBottom: 8, // Maintain space below the title
    marginTop: 20,
  },
  categoryItem: {
    alignItems: "center",
    
    marginRight: 16,
    borderRadius: 15,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    color: "#3B3B3B",
  },
  serviceItem: {
    alignItems: "center",
    marginRight: 16,
  },
  serviceImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  serviceText: {
    fontSize: 14,
    color: "#3B3B3B",
    marginTop: 8,
  },
  // Modal styles
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default HomePage;