import { StyleSheet, Text, TextInput, View } from 'react-native';


function Input({ label, style, textInputConfig }) {

  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline)
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderWidth: 1, // Add border width
    borderColor: '#ccc', // Add border color
    paddingHorizontal: 10,
    borderRadius: 5, // Add border radius for rounded corners
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top'
  },
});