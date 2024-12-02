import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { Ionicons, MaterialIcons } from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";
import backend from "../config/backend";

function ProviderSignIn() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleSignIn = async () => {
    setError("");

    if (!identifier || !password) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${backend.backendUrl}/plogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Sign-in successful!");
        console.log(result);
        navigation.navigate("HomeScreen");
      } else {
        setError(result.message || "Sign-in failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign-in Error:", error);
      setError(
        "An error occurred. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../images/wow.jpg")}
      style={styles.container}
    >
      <KeyboardAvoidingView style={styles.inner} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Provider Sign In</Text>

            <View style={styles.inputContainer}>
              <MaterialIcons
                name="person"
                size={20}
                color="#666"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Email or Phone"
                keyboardType="default"
                value={identifier}
                onChangeText={setIdentifier}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed"
                size={20}
                color="#666"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={isPasswordVisible ? "eye" : "eye-off"}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              style={styles.button}
              onPress={handleSignIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.buttonText}>Sign In</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ForgotPasswordScreen", {
                  requestFrom: "provider",
                })
              }
            >
              <Text style={styles.forgotPasswordLink}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text style={{ color: "#000", fontSize: 16 }}>
                Don't have an account?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("ProviderSignUp")}
              >
                <Text style={styles.link}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
  },
  icon: {
    marginRight: 10,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#FF5722",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  forgotPasswordLink: {
    color: "#FF5722",
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  link: {
    color: "#FF5722",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "#FF0000",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default ProviderSignIn;
