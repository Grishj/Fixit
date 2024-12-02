import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const ForgotPasswordScreen = ({ route, navigation }) => {
  const [email, setEmail] = useState("");

  // Determine where to navigate back based on route params
  const { requestFrom = "user" } = route.params || {}; // Default to 'user'

  const handlePasswordReset = async () => {
    if (!email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        Alert.alert(
          "Success",
          "Password reset instructions have been sent to your email."
        );
        // Navigate back to appropriate screen
        if (requestFrom === "user") {
          navigation.navigate("UserSignIn");
        } else if (requestFrom === "provider") {
          navigation.navigate("ProviderSignIn");
        }
      } else {
        const error = await response.json();
        Alert.alert("Error", error.message);
      }
    } catch (error) {
      console.error("Password reset error:", error);
      Alert.alert(
        "Error",
        "An unexpected error occurred. Please try again later."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text
          style={{
            color: "#000",
            marginTop: 2,
            fontSize: 16,
            paddingHorizontal: 10,
          }}
        >
          Remember Password ?
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              requestFrom === "user" ? "UserSignIn" : "ProviderSignIn"
            )
          }
        >
          <Text style={styles.link}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#FF5722",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "#FF5722",
    fontSize: 16,
    marginTop: 0,
  },
});

export default ForgotPasswordScreen;
