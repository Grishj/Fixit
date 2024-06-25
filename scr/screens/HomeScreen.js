import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,

} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const HomePage = () => {
  return (
    
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
     
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.title}>HomeSolution</Text>
          </View>

          <View style={styles.searchContainer}>
            <TextInput style={styles.searchInput} placeholder="Search" />
            <TouchableOpacity style={styles.searchButton}>
              <FontAwesome5 name="search" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.servicesContainer}>
            <Text>Popular Services</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
          >
            {categories.map((category, index) => (
              <View key={index} style={styles.categoryItem}>
                <View
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: category.color },
                  ]}
                >
                  <FontAwesome5 name={category.icon} size={24} color="white" />
                </View>
                <Text style={styles.categoryText}>{category.name}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.offerContainer}>
            <Text style={styles.offerText}>Offer Painting Service</Text>
            <Text style={styles.discountText}>Get 25%</Text>
            <TouchableOpacity style={styles.offerButton}>
              <Text style={styles.offerButtonText}>Grab Offer</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.offerContainer}>
            <Text style={styles.offerText}>Offer Electronics Service</Text>
            <Text style={styles.discountText}>Get 20%</Text>
            <TouchableOpacity style={styles.offerButton}>
              <Text style={styles.offerButtonText}>Grab Offer</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.servicesContainer}>
            <Text style={styles.sectionTitle}>Our Services</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {services.map((service, index) => (
                <View key={index} style={styles.serviceItem}>
                  <Image source={service.image} style={styles.serviceImage} />
                  <Text style={styles.serviceText}>{service.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>

       
      </View>
   
    </SafeAreaView>
    
  );
};

const categories = [
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

const navItems = [
  { label: "Home", icon: "home" },
  { label: "Categories", icon: "th-list" },
  { label: "Booking", icon: "calendar-check" },
  { label: "Service Provider", icon: "user-cog" },
  { label: "Profile", icon: "user" },
];

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    paddingVertical: 20,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3B3B3B",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
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
  categoriesContainer: {
    flexDirection: "row",
    padding: 16,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 16,
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
  offerContainer: {
    backgroundColor: "#E5F6F5",
    padding: 16,
    alignItems: "center",
    margin: 16,
    borderRadius: 8,
  },
  offerText: {
    fontSize: 16,
    color: "#3B3B3B",
    marginBottom: 8,
  },
  discountText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#3B3B3B",
    marginBottom: 8,
  },
  offerButton: {
    backgroundColor: "#3B3B3B",
    padding: 10,
    borderRadius: 8,
  },
  offerButtonText: {
    color: "white",
    fontSize: 16,
  },
  servicesContainer: {
    padding: 16,
    fontSize: 23,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3B3B3B",
    marginBottom: 8,
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
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderTopColor: "#DDD",
    borderTopWidth: 1,
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#3B3B3B",
    marginTop: 4,
  },
});

export default HomePage;
