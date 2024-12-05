import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

// Mock Data
const CATEGORIES = [
  { id: 1, name: "Cleaning", icon: "broom" },
  { id: 2, name: "Repair", icon: "wrench" },
  { id: 3, name: "Painting", icon: "palette" },
  { id: 4, name: "Plumbing", icon: "pipe" },
  { id: 5, name: "Electrical", icon: "electric-switch" },
];

const PROMOTIONS = [
  { id: 1, image: require("../images/AC.jpeg") },
  { id: 2, image: require("../images/security.jpeg") },
  { id: 3, image: require("../images/maintenance.jpg") },
];

const POPULAR_SERVICES = [
  {
    id: 1,
    name: "Home Deep Cleaning",
    price: "Rs999",
    image: require("../images/cleaning.png"),
  },
  {
    id: 2,
    name: "AC Repair",
    price: "Rs599",
    image: require("../images/AC.jpeg"),
  },
  {
    id: 3,
    name: "Painting",
    price: "Rs1299",
    image: require("../images/Onboard.jpg"),
  },
];

const SERVICE_PROFESSIONALS = [
  {
    id: 1,
    name: "John Nabin",
    service: "Electrician",
    rating: 4.5,
    image: require("../images/professional1.png"),
  },
  {
    id: 2,
    name: "Sarah Subash",
    service: "Plumber",
    rating: 4.8,
    image: require("../images/professional2.png"),
  },
];

const UserHomeScreen = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [location, setLocation] = useState("Current Location");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePromotion, setActivePromotion] = useState(0);
  const scrollRef = useRef();

  // Auto-scroll promotions every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePromotion((prev) => (prev + 1) % PROMOTIONS.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: activePromotion * 350, // Adjust for banner width
        animated: true,
      });
    }
  }, [activePromotion]);

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.locationContainer}>
        <MaterialIcons name="location-on" size={24} color="#FF5722" />
        <Text style={styles.locationText}>{location}</Text>
        <TouchableOpacity>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search services"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    </View>
  );

  const renderPromotionBanner = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.promotionContainer}
      ref={scrollRef}
    >
      {PROMOTIONS.map((promo) => (
        <Image
          key={promo.id}
          source={promo.image}
          style={[
            styles.promotionBanner,
            activePromotion === promo.id - 1 ? styles.activeBanner : null,
          ]}
        />
      ))}
    </ScrollView>
  );

  const renderCategories = () => (
    <View style={styles.categoriesContainer}>
      {CATEGORIES.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.categoryItem}
          onPress={() => navigation.navigate("ServiceListScreen", { category })}
        >
          <MaterialCommunityIcons
            name={category.icon}
            size={30}
            color="#FF5722"
          />
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderPopularServices = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Popular Services</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {POPULAR_SERVICES.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceCard}
            onPress={() =>
              navigation.navigate("ServiceDetailScreen", { service })
            }
          >
            <Image source={service.image} style={styles.serviceImage} />
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.servicePrice}>{service.price} onwards</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderServiceProfessionals = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Top Service Professionals</Text>
      {SERVICE_PROFESSIONALS.map((professional) => (
        <View key={professional.id} style={styles.professionalCard}>
          <Image source={professional.image} style={styles.professionalImage} />
          <View style={styles.professionalDetails}>
            <Text style={styles.professionalName}>{professional.name}</Text>
            <Text style={styles.professionalService}>
              {professional.service}
            </Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{professional.rating}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderBottomNavigation = () => (
    <View style={styles.bottomNavigation}>
      <TouchableOpacity style={styles.navItem}>
        <Ionicons name="home" size={24} color="#FF5722" />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("BookingScreen")}
      >
        <MaterialIcons name="book-online" size={24} color="#666" />
        <Text style={styles.navText}>Bookings</Text>
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
        {renderPromotionBanner()}
        {renderCategories()}
        {renderPopularServices()}
        {renderServiceProfessionals()}
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
    padding: 15,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  locationText: {
    marginHorizontal: 5,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    height: 40,
  },
  promotionContainer: {
    marginVertical: 10,
  },
  promotionBanner: {
    width: 350,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  activeBanner: {
    borderWidth: 2,
    borderColor: "#FF5722",
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "white",
  },
  categoryItem: {
    alignItems: "center",
    width: "20%",
    marginVertical: 10,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12,
  },
  sectionContainer: {
    marginVertical: 10,
    backgroundColor: "white",
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  serviceCard: {
    marginRight: 15,
    width: 150,
  },
  serviceImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  serviceName: {
    marginTop: 5,
    fontWeight: "bold",
  },
  servicePrice: {
    color: "#666",
  },
  professionalCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  professionalImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  professionalDetails: {
    flex: 1,
  },
  professionalName: {
    fontWeight: "bold",
  },
  professionalService: {
    color: "#666",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    color: "#666",
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "white",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default UserHomeScreen;
