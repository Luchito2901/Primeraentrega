import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function diseño() {
  return (
    <View style={styles.container}>
      <View style={styles.display} />

      <View style={styles.row}>
        <View style={styles.onebutton} />
        <View style={styles.onebutton} />
        <View style={styles.onebutton} />
      </View>

      <View style={styles.longButton} />
      <View style={styles.row}>
        <View style={styles.button} />
        <View style={styles.button} />
        <View style={styles.button} />
      </View>

      <View style={styles.row}>
        <View style={styles.button} />
        <View style={styles.button} />
        <View style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
  },
  display: {
    width: "90%",
    height: 150,
    backgroundColor: "blue",
    marginBottom: 15,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
  },
  onebutton: {
    width: 100,
    height: 130,
    backgroundColor: 'green',
    borderRadius: 10,
  },
  button: {
    width: 80,
    height: 80,
    backgroundColor: "green",
    borderRadius: 10,
  },
  longButton: {
    width: "90%",
    height: 50,
    backgroundColor: "blue",
    marginBottom: 10,
    borderRadius: 10,
  },
});


