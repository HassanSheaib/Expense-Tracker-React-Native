import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ register, login }) => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const saveloginState = (userData, name) => {
    const updatedArray = userData.map((obj) => {
      if (obj.name === name) {
        return { ...obj, status: "loggedIn" };
      }
      return obj;
    });

    try {
      AsyncStorage.setItem("users", JSON.stringify(updatedArray));
    } catch {
      console.log("updating user failed");
    }
  };
  const signInHandler = async () => {
    try {
      const users = await AsyncStorage.getItem("users");
      if (users !== null) {
        const usersData = JSON.parse(users);
        usersData.forEach((user) => {
          if (user.name == name && user.pass == pass) {
            login(name, pass);
            saveloginState(usersData, name);
          } else {
            console.log("Error retrieving username");
            setAlertMessage("Tha name and passwrod combination does not mathc");
          }
        });
      }
    } catch (error) {
      console.error("Error retrieving username:", error);
    }
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null} // Try different behaviors
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Optional: Adjust the offset if needed
        enabled 
      >
        <View style={styles.container}>
          <Image
            source={require("../assets/login.png")} // Replace this with the path to your logo image
            style={styles.logo}
          />
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="name"
              placeholderTextColor="#003f5c"
              autoCapitalize="none"
              value={name}
              onChangeText={(name) => {
                setName(name);
              }}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="password"
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              value={pass}
              onChangeText={(pass) => {
                setPass(pass);
              }}
            />
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={signInHandler}>
            <Text style={styles.loginText}>Sign In</Text>
          </TouchableOpacity>
          <Text>
            <TouchableOpacity>
              <Text style={styles.registerText}>Don't have an account?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                register();
              }}
            >
              <Text style={styles.loginText}> Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#5c5c5c",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    height: 50,
    marginBottom: 10,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#5c5c5c",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "grey",
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  loginText: {
    color: "#fff",
  },

  registerText: {
    color: "white",
  },
  logo: {
    width: "60%",
    height: "30%",
    marginBottom: 50,
    borderRadius: 70,
    opacity: 0.2,
  },
});

export default Login;
