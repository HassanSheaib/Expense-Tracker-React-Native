import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";

const Registration = ({ signIn, register }) => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ],
      { cancelable: false }
    );
  };

  const nameValidation = (name) => {
    const namePattern = /^[a-zA-Z]{6,}$/;
    return namePattern.test(name);
  };
  const validatePass = (pass, confirmPass) => {
    const isLengthValid = pass.length >= 6;
    const areMatched = pass === confirmPass;
    return isLengthValid && areMatched;
  };
  const registrationHandler = () => {
    if (nameValidation(name) && validatePass(pass, confirmPass)) {
      register(name, pass);
    } else {
      showAlert("Registration Failed", "passwords doesn't match");
    }
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null} // Try different behaviors
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Optional: Adjust the offset if needed
        enabled
      >
        <View style={styles.container}>
          <Image source={require("../assets/signup.png")} style={styles.logo} />
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="name"
              placeholderTextColor="#003f5c"
              value={name}
              onChangeText={(name) => {
                setName(name);
              }}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="password"
              value={pass}
              onChangeText={(pass) => {
                setPass(pass);
              }}
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="confirm password"
              placeholderTextColor="#003f5c"
              value={confirmPass}
              onChangeText={(confirmPass) => {
                setConfirmPass(confirmPass);
              }}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={registrationHandler}
          >
            <Text style={styles.loginText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              signIn();
            }}
          >
            <Text style={styles.loginText}> Login</Text>
          </TouchableOpacity>
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

export default Registration;
