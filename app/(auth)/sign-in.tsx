import { icons, images } from "@/constants";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [form, setForm] = useState({   
    email: "",
    password: "",   
  });

  const onSignInPress = async () => {};

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <View className="relative w-full h-[250px]">
            <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          </View>
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
           Welconme 👋
          </Text>
        </View>
        <View>
        
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons?.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          ></InputField>
          <InputField
            label="Password"
            placeholder="Enter your Password"
            icon={icons?.lock}
            secureTextEntry={true}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          ></InputField>
         
          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-6"
          />
        </View>

        {/*OAuth*/}
        <OAuth/>
        
        <View className="mt-2 mb-10">
          <Text className="text-xl mt-4 text-center base-regular text-black ">
            Don`t have an Account? {" "}
            <Link
              href={"/sign-up"}
              className="text-lg text-primary-500 font-JakartaSemiBold"
            >
              Sign Up
            </Link>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
