import React, { useState, useContext } from "react";
import Login from "./Login";
import Registration from "./Registration";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyContext } from "../App";
import { Alert } from "react-native";

const Auth = () => {
  const { setUser, setIsLoggedIn } = useContext(MyContext);
  const [registrationLoginTroggler, setRegistrationLoginTroggler] =
    useState(false);
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
  const checkExistingUser = (username, users) => {
    let count = 0;
    users.forEach((user) => {
      if (user.name == username) {
        count += 1;
      }
    });
    return count;
  };
  const openRegsitertion = () => {
    setRegistrationLoginTroggler(true);
  };
  const openLogin = () => {
    setRegistrationLoginTroggler(false);
  };
  const handleLogin = async (name, pass) => {
    setIsLoggedIn(true);
    setUser(name);
  };

  const handleRegister = async (name, pass) => {
    let users = [];
    try {
      const data = await AsyncStorage.getItem("users");
      if (data !== null) {
        users = JSON.parse(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    try {
      let newUser = {
        name: name,
        pass: pass,
        status: "loggedIn",
      };
      userAlreadyExist = checkExistingUser(newUser.name, users);
      if (userAlreadyExist == 0) {
        users = [...users, newUser];
        AsyncStorage.setItem("users", JSON.stringify(users));
        setUser(name);
        setIsLoggedIn(true);
      } else {
        showAlert("Registration Failed", "username already exist");
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };
  return (
    <>
      {!registrationLoginTroggler ? (
        <Login register={openRegsitertion} login={handleLogin}></Login>
      ) : (
        <Registration
          signIn={openLogin}
          register={handleRegister}
        ></Registration>
      )}
    </>
  );
};

export default Auth;
