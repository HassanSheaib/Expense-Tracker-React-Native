import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import TargetIcon from "./TargetIcon";
import ProgressBar from "react-native-progress/Bar";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomModal from "../modal/CustomModal";
const TargetRow = ({
  iconName,
  title,
  backgroundColor,
  value,
  progress,
  handleToggleModal,
}) => {
  return (
    <View style={styles.container}>
      <TargetIcon iconName={iconName} backgroundColor={backgroundColor} />
      <View style={styles.titleAndProgress}>
        <Text style={styles.title}>
          {title} {value} KWD
          <TouchableOpacity onPress={handleToggleModal}>
            <FontAwesome5
              name="pen"
              size={12}
              color="white"
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        </Text>
        <View style={{}}>
          <ProgressBar
            progress={progress}
            width={250}
            height={10}
            color={backgroundColor}
            borderWidth={2}
            unfilledColor="#000"
            borderColor="grey"
            borderRadius={10}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginRight: 60,
              marginTop: 10,
            }}
          >
            <Text style={{ fontWeight: "300", fontSize: 12, color: "grey" }}>
              {(progress * 100).toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  titleAndProgress: {
    flex: 1,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: "white",
  },
  text: {
    color: "white",
  },
});

export default TargetRow;
