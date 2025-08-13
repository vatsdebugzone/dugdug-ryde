import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import MapView from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const Ride = () => {

  const [location, setLocation] = useState({
    latitude: 51.5078788,
    longitude: -0.0877321,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <MapView style={styles.map}  region={location} showsUserLocation={true}
        className="w-full h-full">
        <Text className="text-lg font-JakartaBold mt-5 mb-3 h-[300px] w-[300px]">Map</Text>
        </MapView>
      {/* <Text className="text-2xl">Ride</Text> */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  absoluteBox: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    margin: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  boxIcon: {
    position: 'absolute',
    left: 15,
    top: 18,
    zIndex: 1,
  },
});

export default Ride;
