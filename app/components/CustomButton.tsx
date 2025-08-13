import { ButtonProps } from "@/types/type";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const bgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "primary":
      return "bg-blue-500";
    case "secondary":
      return "bg-gray-300";
    case "danger":
      return "bg-red-500";
    case "outline":
      return "border border-blue-600 bg-transparent";
    case "success":
      return "bg-green-600";
    default:
      return "bg-[#0286ff]";
  }
};

const getTextVariant = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-white";
    case "warning":
      return "text-black";
    case "secondary":
      return "text-gray-600";
    case "danger":
      return "text-red-600";
    case "success":
      return "text-green-600";
    default:
      return "text-white";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant,
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`py-4 mx-3 rounded-full flex flex-row justify-center items-center shadow-md shadow-neutral-340/70 ${bgVariantStyle(bgVariant)} ${className}`}
      {...props}
    >
      {IconLeft && <IconLeft />}
      <Text className={`text-xl font-bold ${getTextVariant(textVariant)}`}>
        {title}
      </Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
