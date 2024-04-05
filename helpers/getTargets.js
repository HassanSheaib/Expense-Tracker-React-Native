import AsyncStorage from '@react-native-async-storage/async-storage';


export const saveTargetsToStorage = async (target, savingsValue) => {
  try {
    await AsyncStorage.setItem(target, JSON.stringify(savingsValue));
    console.log("Savings saved successfully.");
  } catch (error) {
    console.error("Error saving savings:", error);
  }
};

export const getTargetFromStorage = async (target) => {
  try {
    const savedTarget = await AsyncStorage.getItem(target);
    const parsedTarget = savedTarget !== null ? JSON.parse(savedTarget) : 0.0;
    return parsedTarget
  } catch (error) {
    console.error('Error retrieving data from local storage:', error);
    return 0.0;
  }
};

export const clearTargets = async (target) => {
    try {
      await AsyncStorage.clear();
      console.log("Local storage cleared successfully");
    } catch (error) {
      console.error("Error clearing local storage:", error);
    }
  };