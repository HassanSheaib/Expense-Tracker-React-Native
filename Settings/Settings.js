import React, {useState, useContext} from "react";
import { View, Button, StyleSheet, TouchableOpacity } from "react-native";
import CustomNavBar from "../components/CustomNavBar";
import { MyContext } from "../App";
import CustomAlert from "../modal/CustomAlert";

const Settings = () => {
  const { handleLogOut } = useContext(MyContext);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  const openLogoutAlert = () => {
    setShowLogoutAlert(true);
  };
  const confirmLogout = async () => {
    handleLogOut();
  };
  const cancelLogout = () => {
    setShowLogoutAlert(false);
  };
  return (
    <View style={styles.container}>
      <CustomNavBar></CustomNavBar>
      <View style={styles.btnContainer}>
        <View style={styles.logoutBtn}>
          <Button title="Logout" onPress={openLogoutAlert} color="white" />
        </View>
      </View>
      <CustomAlert
        isVisible={showLogoutAlert}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  logoutBtn: {
    width: "80%",
    backgroundColor: "red",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  btnContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default Settings;
