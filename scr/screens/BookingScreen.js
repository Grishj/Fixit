import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import MapView, { Marker } from "react-native-maps";

const ServiceDetails = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityOpen, setCityOpen] = useState(false);
  const [cityItems, setCityItems] = useState([
    { label: "Pokhara", value: "Pokhara", coordinates: { latitude: 28.2096, longitude: 83.9856 } },
    { label: "Lamachour", value: "Lamachour", coordinates: { latitude: 28.2448, longitude: 83.9686 } },
    { label: "Kathmandu", value: "Kathmandu", coordinates: { latitude: 27.7172, longitude: 85.3240 } },
    { label: "Chitwan", value: "Chitwan", coordinates: { latitude: 27.5291, longitude: 84.3542 } },
  ]);

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [districtOpen, setDistrictOpen] = useState(false);
  const [districtItems, setDistrictItems] = useState([
    { label: "Kathmandu", value: "Kathmandu" },
    { label: "Chitwan", value: "Chitwan" },
  ]);

  const [selectedDuration, setSelectedDuration] = useState("full");
  const [selectedFrequency, setSelectedFrequency] = useState("weekly");

  const [region, setRegion] = useState({
    latitude: 27.7172, // Default location: Kathmandu
    longitude: 85.3240,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const onCityOpen = useCallback(() => {
    setDistrictOpen(false);
  }, []);

  const onDistrictOpen = useCallback(() => {
    setCityOpen(false);
  }, []);

  const resetLocation = () => {
    setSelectedCity(null);
    setSelectedDistrict(null);
    setRegion({
      latitude: 28.2096, // Pokhara, Nepal
      longitude: 83.9856,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  };

  // Update map location based on city selection
  const handleCitySelect = (cityValue) => {
    setSelectedCity(cityValue);
    const selectedCityItem = cityItems.find((item) => item.value === cityValue);
    if (selectedCityItem) {
      setRegion({
        ...selectedCityItem.coordinates,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </View>

        <View style={styles.content}>
          <Image source={require('../images/cleaning.png')} style={styles.image} />

          <Text style={styles.title}>Cleaning Service</Text>

          <Text style={styles.subtitle}>Where?</Text>
          <View style={styles.dropdownContainer}>
            <DropDownPicker
              open={cityOpen}
              value={selectedCity}
              items={cityItems}
              setOpen={setCityOpen}
              setValue={handleCitySelect} // Set city selection to update map location
              setItems={setCityItems}
              placeholder="Select City"
              containerStyle={styles.dropdown}
              onOpen={onCityOpen}
            />

            <DropDownPicker
              open={districtOpen}
              value={selectedDistrict}
              items={districtItems}
              setOpen={setDistrictOpen}
              setValue={setSelectedDistrict}
              setItems={setDistrictItems}
              placeholder="Select District"
              containerStyle={styles.dropdown}
              onOpen={onDistrictOpen}
            />
          </View>

          <TouchableOpacity style={styles.resetButton} onPress={resetLocation}>
            <Text style={styles.resetButtonText}>Reset Location</Text>
          </TouchableOpacity>

          <Text style={styles.subtitle}>Map Location</Text>
          <MapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
          >
            <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
          </MapView>

          <Text style={styles.subtitle}>How many hours in the day?</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedDuration === "full" && styles.selectedOption,
              ]}
              onPress={() => setSelectedDuration("full")}
            >
              <Text style={styles.optionText}>Full Day</Text>
              <Text style={styles.priceText}>8 hrs </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedDuration === "half" && styles.selectedOption,
              ]}
              onPress={() => setSelectedDuration("half")}
            >
              <Text style={styles.optionText}>Half Day</Text>
              <Text style={styles.priceText}>4 hrs </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>Service Frequency</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedFrequency === "weekly" && styles.selectedOption,
              ]}
              onPress={() => setSelectedFrequency("weekly")}
            >
              <Text style={styles.optionText}>Weekly</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedFrequency === "biweekly" && styles.selectedOption,
              ]}
              onPress={() => setSelectedFrequency("biweekly")}
            >
              <Text style={styles.optionText}>Every 2 Weeks</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                selectedFrequency === "monthly" && styles.selectedOption,
              ]}
              onPress={() => setSelectedFrequency("monthly")}
            >
              <Text style={styles.optionText}>Monthly</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFF",
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 10,
  },
  content: {
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  subtitle: {
    alignSelf: "flex-start",
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    marginVertical: 10,
  },
  dropdownContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dropdown: {
    width: "48%",
  },
  resetButton: {
    backgroundColor: "#E74C3C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  resetButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 20,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  optionButton: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  selectedOption: {
    backgroundColor: "#E1E5EE",
    borderColor: "#5B8EE1",
    borderWidth: 1,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  priceText: {
    fontSize: 14,
    color: "#888",
  },
});

export default ServiceDetails;
