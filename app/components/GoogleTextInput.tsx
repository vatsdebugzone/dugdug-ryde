import { GoogleInputProps } from "@/types/type";
import React from "react";
import { Text, View } from "react-native";

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  handlePress,
}:GoogleInputProps) => {
  return (
    <View>
      <Text className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5`}> GoogleTextInput</Text>
    </View>
  );
};

export default GoogleTextInput;
