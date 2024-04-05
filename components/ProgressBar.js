// import React, { useRef, useEffect } from 'react';
// import { View, Animated, StyleSheet, Dimensions } from 'react-native';

// const ProgressBar = ({ progress }) => {
//   const width = Dimensions.get('window').width;
//   const progressAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.timing(progressAnim, {
//       toValue: progress,
//       duration: 500, // Adjust duration as needed
//       useNativeDriver: false,
//     }).start();
//   }, [progress]);

//   return (
//     <View style={styles.container}>
//       <Animated.View
//         style={[
//           styles.progressBar,
//           { width: progressAnim.interpolate({
//               inputRange: [0, 1],
//               outputRange: ['0%', '100%'],
//             }),
//           },
//         ]}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: 10,
//     backgroundColor: 'white',
//     borderRadius: 5,
//     overflow: 'hidden',
//   },
//   progressBar: {
//     height: '100%',
//     backgroundColor: 'red', // Change color as needed
//   },
// });

// export default ProgressBar;