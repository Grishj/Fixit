import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

// Mock Data for Professionals
const PROFESSIONALS = {
  Cleaning: [
    {
      id: 1,
      name: "John Doe",
      rating: 4.5,
      image: require("../images/cleaning.png"),
    },
  ],
  Repair: [
    {
      id: 2,
      name: "Sarah Smith",
      rating: 4.8,
      image: require("../images/maintenance.jpg"),
    },
  ],
  Painting: [
    {
      id: 3,
      name: "Tom Harris",
      rating: 4.6,
      image: require("../images/Onboard.jpg"),
    },
  ],
  Plumbing: [
    {
      id: 4,
      name: "Chris Brown",
      rating: 4.9,
      image: require("../images/security.jpeg"),
    },
  ],
  Electrical: [
    {
      id: 5,
      name: "Mike Green",
      rating: 4.7,
      image: require("../images/AC.jpeg"),
    },
  ],
};

const ServiceListScreen = ({ route }) => {
  const { category, service } = route.params || {};
  const professionals = PROFESSIONALS[category.name] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category.name} Professionals</Text>
      <FlatList
        data={professionals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.rating}>Rating: {item.rating}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  name: {
    fontWeight: "bold",
  },
  rating: {
    color: "#666",
  },
});

export default ServiceListScreen;
