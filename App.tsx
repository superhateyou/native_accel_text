import { Accelerometer } from "expo-sensors";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type TCoordinates = {
  x: number;
  y: number;
  z: number;
};

const FIELD_SIZING = 350;
const DOT_DIAMETER = 16;
const DOT_RADIUS = DOT_DIAMETER / 2;
const START_COORDINATES = FIELD_SIZING / 2;

export default function App() {
  const [{ x, y, z }, setData] = useState<TCoordinates>({ x: 0, y: 0, z: 0 });

  const [subscription, setSubscription] = useState<any>(null);

  Accelerometer.setUpdateInterval(1);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Text>
        [x: {x.toFixed(2)}][y: {y.toFixed(2)}][z: {z.toFixed(2)}]
      </Text>
      <View>
        <View
          style={{
            ...styles.dot,
            top: START_COORDINATES + DOT_RADIUS - Number(y.toFixed(2)) * 50,
            left: START_COORDINATES - DOT_RADIUS + Number(x.toFixed(2)) * 50,
          }}
        ></View>
        <View style={styles.field}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  field: {
    marginTop: 20,
    width: FIELD_SIZING,
    height: FIELD_SIZING,
    backgroundColor: "skyblue",
  },
  dot: {
    zIndex: 1000,
    position: "absolute",
    backgroundColor: "black",
    width: DOT_DIAMETER,
    height: DOT_DIAMETER,
    borderRadius: 50,
  },
});
